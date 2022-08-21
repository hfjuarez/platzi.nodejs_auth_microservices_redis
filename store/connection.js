import db from "./dummy.js";
import { exists } from "../helpers/index.js";

class Connection {
  constructor(db, table) {
    if (!exists(table)) throw new Error("Table is empty");
    this.db = db;
    this.table = table;
  }

  list = async () => {
    return this.db[this.table];
  };
  get = async ({ id = null, keyName = "id" }) => {
    if (!exists(id)) throw new Error(`${keyName.toUpperCase()} is empty`);
    const collection = await this.db[this.table];
    return collection.filter((el) => el[keyName] === id)[0];
  };
  create = ({ data }) => {
    this.db[this.table].push(data);
  };
  update = ({ data, id, keyName = "id" }) => {
    if (!exists(id)) throw new Error(`${keyName.toUpperCase()} is empty`);
    const index = this.db[this.table].findIndex((el) => el[keyName] === id);
    const keys = Object.keys(this.db[this.table][index]);
    keys.forEach((key) => {
      if (data[key] && data[key] !== this.db[this.table][index][key])
        this.db[this.table][index][key] = data[key];
    });
  };
  remove = ({ id, keyName = "id" }) => {
    if (!exists(id)) throw new Error(`${keyName.toUpperCase()} is empty`);
    return false;
  };
}

const instance = (table) => new Connection(db, table);

export default Object.freeze(instance);
