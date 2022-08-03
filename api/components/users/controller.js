const service = require("./service.js");

const controller = {};

controller.list = () => service.list();

module.exports = controller;
