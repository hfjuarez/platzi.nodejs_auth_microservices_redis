import store from "../../../store/connection.js";
import { exists } from "../../../helpers/index.js";
import { sign, verify } from "../../../auth/index.js";
import { nanoid } from "nanoid";
const week = 60;

class Service {
  constructor(store) {
    this.store = store;
  }
  validate = async ({ token }) => {
    const decoded = verify(token);
    const auth = await this.get(decoded.username, "username");
    return auth.session === decoded.session;
  };
  login = async ({ username, password }) => {
    if (!exists(username)) throw new Error("Username is empty");
    if (!exists(password)) throw new Error("Password is empty");
    const auth = await this.get(username, "username");
    if (
      verify(auth.password) === `${password}${auth.salt}` &&
      auth?.username === username
    ) {
      const session = nanoid();
      this.store.update({ id: auth.id, data: { ...auth, session } });
      return sign({ username, session }, { expiresIn: week });
    }
    throw new Error("Not authenticated");
  };
  get = async (id, keyName = "id") => this.store.get({ id, keyName });
  create = async (data) => {
    if (!exists(data.id)) throw new Error("ID is empty");
    if (!exists(data.username)) throw new Error("Username is empty");
    if (!exists(data.password)) throw new Error("Password is empty");

    const salt = nanoid();
    const auth = {
      id: data.id,
      username: data.username,
      password: sign(`${data.password}${salt}`),
      session: null,
      salt,
    };
    return await this.store.create({
      data: auth,
    });
  };
  update = async (user, actualUsername, actualPassword) => {
    if (!exists(user.id)) throw new Error("ID is empty");
    const auth = await this.get(user.id);
    if (this.validate(actualUsername, actualPassword)) {
      let hasToUpdate = false;
      const newAuthData = { ...auth };
      if (actualUsername !== user.username) {
        hasToUpdate = true;
        newAuthData.username = user.username;
      }
      if (actualPassword !== user.password) {
        hasToUpdate = true;
        newAuthData.password = user.password;
      }
      if (hasToUpdate) await this.store.update({ id, data: newAuthData });
      return true;
    } else {
      throw new Error("Not authenticated");
    }
  };
}

const instance = new Service(store("auth"));

export default Object.freeze(instance);
