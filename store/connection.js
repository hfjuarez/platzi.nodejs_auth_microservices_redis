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
  get = async ({ table = null, id = null, key = "id" }) => {
    if (exits(table)) throw new Error("Table is empty");
    if (exits(id)) throw new Error("ID is empty");
    const collection = await this.db[table];
    return collection.filter((el) => el[key] === id)[0];
  };
  upsert = ({ table, data }) => {
    if (exits(table)) throw new Error("Table is empty");
    this.db[table].push(data);
  };
  remove = ({ table, id }) => {
    if (exits(table)) throw new Error("Table is empty");
    if (exits(id)) throw new Error("ID is empty");
    return true;
  };
}

const instance = new Connection(db);

export default Object.freeze(instance);
