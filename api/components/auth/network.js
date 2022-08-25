import express from "express";

import * as response from "../../../network/response.js";
import controller from "./controller.js";

const router = express.Router();
router.post("/login", login);
router.post("/validate", validate);

async function login(req, res) {
  try {
    const token = await controller.login(req.body);
    response.success({
      req,
      res,
      message: "",
      data: token,
      status: 200,
    });
  } catch (error) {
    response.error({
      req,
      res,
      message: error.message,
      status: error.message === "Not authenticated" ? 401 : 500,
    });
  }
}

async function validate(req, res) {
  try {
    const data = await controller.validate(req.body);
    response.success({
      req,
      res,
      message: "",
      data: data,
      status: 200,
    });
  } catch (error) {
    response.error({
      req,
      res,
      message: error.message,
      status: error.message === "Not authenticated" ? 401 : 500,
    });
  }
}

export default router;
