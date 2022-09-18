import express from 'express';

import { HandleResponse } from '../../../network/response.js';
import controller from './controller.js';

const router = express.Router();
router.post('/login', login);

async function login(req, res) {
  try {
    const result = await controller.login(req.body);
    return HandleResponse({ res, result });
  } catch (error) {
    return HandleResponse({ res, result: error });
  }
}

export default router;
