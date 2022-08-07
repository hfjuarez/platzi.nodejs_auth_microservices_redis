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
const create = async (req, res) => {
  try {
    const data = await controller.create(req.body);
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
const update = async (req, res) => {
  try {
    const data = await controller.update(req.params.id, req.body);
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
router.post("/", create);
router.get("/:id", get);
router.put("/:id", update);

export default router;
