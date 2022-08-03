const express = require("express");

const response = require("../../../network/response");
const controller = require("./controller.js");

const router = express.Router();

router.get("/", (req, res) => {
  const data = controller.list();
  console.log("data", data);
  response.success({
    req,
    res,
    message: "",
    data,
    status: 200,
  });
});

module.exports = router;
