import store from "../../../store/connection.js";
import { exists } from "../../../helpers/index.js";
import { sign, verify } from "../../../auth/index.js";
import { nanoid } from "nanoid";
import { hash, compare } from "bcrypt";
const week = 60;

class Service {
  constructor(store) {
    this.store = store;
  }
  list = () => this.store.list();
  validate = async ({ token }) => {
    const decoded = verify(token);
    const auth = await this.get(decoded.username, "username");
    if (!auth) throw new Error("Not authenticated");
    return auth.session === decoded.session;
  };
  login = async ({ username, password }) => {
    if (!exists(username)) throw new Error("Username is empty");
    if (!exists(password)) throw new Error("Password is empty");
    const auth = await this.get(username, "username");
    if (
      !!auth &&
      (await compare(`${password}${auth.salt}`, auth.password)) &&
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
      password: await hash(`${data.password}${salt}`, 7),
      session: null,
      salt,
    };
    return await this.store.create({
      data: auth,
    });
  };
}

const instance = new Service(store("auth"));

export default Object.freeze(instance);
