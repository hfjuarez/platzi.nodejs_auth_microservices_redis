import { nanoid } from "nanoid";
import store from "../../../store/connection.js";

class Service {
  constructor(store, table) {
    this.TABLE = table;
    this.store = store;
  }
  list = () => this.store.list({ table: this.TABLE });
  get = (id) => this.store.get({ table: this.TABLE, id, key: "id" });
  upsert = ({ name = null }) => {
    if (!name) throw new Error("Name is empty");
    return this.store.upsert({
      table: this.TABLE,
      data: { id: nanoid(), name },
    });
  };
}

const instance = new Service(store, "users");

export default Object.freeze(instance);
