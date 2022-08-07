import { nanoid } from "nanoid";
import store from "../../../store/connection.js";

class Service {
  constructor(store, table) {
    this.TABLE = table;
    this.store = store;
  }
  list = () => this.store.list({ table: this.TABLE });
  get = (id) => this.store.get({ table: this.TABLE, id, key: "id" });
  create = async (body) => {
    if (!body.name) throw new Error("Name is empty");
    if (!body.username) throw new Error("Username is empty");
    if (!body.password) throw new Error("Password is empty");
    const user = {
      id: body.id,
      name: body.name,
      username: body.username,
    };
    if (body.password || user.username) {
      // await auth.upsert({
      //   id: user.id,
      //   username: user.username,
      //   password: body.password,
      // });
    }
    user.id = nanoid();
    return this.store.create({
      table: this.TABLE,
      data: user,
    });
  };
  update = async (id, body) => {
    if (!id && this.get(id)) throw new Error("ID doesn't exits");
    const user = {
      name: body.name,
      username: body.username,
    };
    return this.store.update({
      table: this.TABLE,
      id,
      data: user,
    });
  };
}

const instance = new Service(store, "users");

export default Object.freeze(instance);
