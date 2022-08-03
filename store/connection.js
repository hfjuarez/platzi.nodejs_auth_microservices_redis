const db = require("./dummy.js");

const connection = {};

const exits = (val) => !val;

connection.list = ({ table = null }) => {
  if (exits(table)) throw new Error("Table is empty");
  return db[table];
};
connection.get = ({ table = null, id = null, key = "id" }) => {
  if (exits(table)) throw new Error("Table is empty");
  if (exits(id)) throw new Error("ID is empty");
  let collection = list(db[table]);
  return collection.filter((i) => i[key] === id);
};
connection.upsert = ({ table, data }) => {
  if (exits(table)) throw new Error("Table is empty");
  db[tabla].push(data);
};
connection.remove = ({ table, id }) => {
  if (exits(table)) throw new Error("Table is empty");
  if (exits(id)) throw new Error("ID is empty");
  return true;
};

module.exports = connection;
