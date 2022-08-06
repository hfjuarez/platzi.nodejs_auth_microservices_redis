import express from "express";

import * as response from "../../../network/response.js";
import controller from "./controller.js";

const list = async (req, res) => {
  try {
    const data = await controller.list();
    response.success({
      req,
      res,
      message: "",
      data,
      status: 200,
    });
  } catch (error) {
    response.error({
      req,
      res,
      message: error.message,
    });
  }
};
const get = async (req, res) => {
  try {
    const data = await controller.get(req.params.id);
    response.success({
      req,
      res,
      message: "",
      data,
      status: 200,
    });
  } catch (error) {
    response.error({
      req,
      res,
      message: error.message,
    });
  }
};
const upsert = async (req, res) => {
  try {
    const data = await controller.upsert(req.body);
    response.success({
      req,
      res,
      message: "",
      data,
      status: 200,
    });
  } catch (error) {
    response.error({
      req,
      res,
      message: error.message,
    });
  }
};

const router = express.Router();
router.get("/", list);
router.post("/", upsert);
router.get("/:id", get);

export default router;
