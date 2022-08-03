const store = require("../../../store/connection");
const TABLE = "users";

const service = {};

service.list = () => store.list({ table: TABLE });

module.exports = service;
