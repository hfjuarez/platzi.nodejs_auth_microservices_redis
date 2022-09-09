import express from 'express';

import * as response from '../../../network/response.js';
import controller from './controller.js';
import middleware from './middleware.js';

const router = express.Router();
router.get('/', list);
router.post('/', create);
router.get('/:id', get);
router.put('/:id', middleware.update, update);

async function list(req, res) {
  try {
    const data = await controller.list();
    response.success({
      req,
      res,
      message: '',
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
}
async function get(req, res) {
  try {
    const data = await controller.get(req.params.id);
    response.success({
      req,
      res,
      message: '',
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
}
async function create(req, res) {
  try {
    const data = await controller.create(req.body);
    response.success({
      req,
      res,
      message: '',
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
}
async function update(req, res) {
  try {
    const data = await controller.update(req.params.id, req.body);
    response.success({
      req,
      res,
      message: '',
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
}

export default router;
