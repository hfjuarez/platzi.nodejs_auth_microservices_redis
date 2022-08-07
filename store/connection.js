import db from "./dummy.js";
import { exits } from "../helpers/index.js";

class Connection {
  constructor(db) {
    this.db = db;
  }

  list = async ({ table = null }) => {
    if (exits(table)) new Error("Table is empty");
    return this.db[table];
  };
  get = async ({ table = null, id = null, keyName = "id" }) => {
    if (exits(table)) throw new Error("Table is empty");
    if (exits(id)) throw new Error(`${keyName.toUpperCase()} is empty`);
    const collection = await this.db[table];
    return collection.filter((el) => el[keyName] === id)[0];
  };
  create = ({ table, data }) => {
    if (exits(table)) throw new Error("Table is empty");
    this.db[table].push(data);
  };
  update = ({ table, data, id, keyName = "id" }) => {
    if (exits(table)) throw new Error("Table is empty");
    if (exits(id)) throw new Error(`${keyName.toUpperCase()} is empty`);
    const index = this.db[table].findIndex((el) => el[keyName] === id);
    const keys = Object.keys(this.db[table][index]);
    keys.forEach((key) => {
      if (data[key] && data[key] !== this.db[table][index][key])
        this.db[table][index][key] = data[key];
    });
  };
  remove = ({ table, id, keyName = "id" }) => {
    if (exits(table)) throw new Error("Table is empty");
    if (exits(id)) throw new Error(`${keyName.toUpperCase()} is empty`);
    return true;
  };
}

const instance = new Connection(db);

export default Object.freeze(instance);
