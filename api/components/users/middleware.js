import { validate } from '../../../auth/index.js';
import * as response from '../../../network/response.js';

const middleware = {};
const allowList = [];

middleware.update = async (req, res, next) => {
  try {
    if (await validate(req)) return next();
    throw new Error('Not authenticated');
  } catch (error) {
    console.error(error);
    response.error({
      req,
      res,
      message: error.message,
    });
  }
};

export default middleware;
