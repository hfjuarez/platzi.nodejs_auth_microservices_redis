import express from 'express';

import { HandleResponse } from '../../../network/response.js';
import controller from './controller.js';
import middleware from './middleware.js';

const router = express.Router();
router.get('/', list);
router.post('/', create);
router.get('/:id', get);
router.put('/:id', middleware.update, update);

async function list(req, res) {
  try {
    const result = await controller.list();
    return HandleResponse({ res, result });
  } catch (error) {
    return HandleResponse({ res, result: error });
  }
}
async function get(req, res) {
  try {
    const result = await controller.get(req.params.id);
    return HandleResponse({ res, result });
  } catch (error) {
    return HandleResponse({ res, result: error });
  }
}
async function create(req, res) {
  try {
    const result = await controller.create(req.body);
    return HandleResponse({ res, result });
  } catch (error) {
    return HandleResponse({ res, result: error });
  }
}
async function update(req, res) {
  try {
    const result = await controller.update(req.params.id, req.body);
    return HandleResponse({ res, result });
  } catch (error) {
    return HandleResponse({ res, result: error });
  }
}

export default router;
