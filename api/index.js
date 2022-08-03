const express = require("express");

const config = require("../config.js");
const users = require("./components/users/network");

const app = express();

// Rouer
app.use("/users", users);

app.listen(config.api.port, () => {
  console.log("listing port:", config.api.port);
});
