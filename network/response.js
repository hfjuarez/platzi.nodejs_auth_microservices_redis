import config from '../config.js';

export const Ok = ({ res, message = '', data = {}, status = 200 }) => {
  res.status(status).send({
    success: true,
    message,
    data,
  });
};

const ErrorResponse = ({
  res,
  message = 'Unknown Error',
  data = {},
  status = 500,
}) => {
  if (config.dev || config.staging) {
    if (data instanceof Error) {
      res.status(status).send({
        success: false,
        message: data.message,
        data: data.stack,
      });
    }
  }
  let msg = message;
  if (data instanceof Error) msg = data.message;
  res.status(status).send({
    success: false,
    msg,
    data,
  });
};
export const BadRequest = ({ res, message = 'Bad Request', data }) => {
  ErrorResponse({ res, message, data, status: 400 });
};
export const NotAuthenticated = ({
  res,
  message = 'Not Authenticated',
  data,
}) => {
  ErrorResponse({ req, res, message, data, status: 401 });
};
export const InternalServerError = ({
  res,
  message = 'Internal Server Error',
  data,
}) => {
  ErrorResponse({
    res,
    message: 'Internal Server Error: ' + message,
    data,
    status: 500,
  });
};
export const NotFound = ({ res, message = 'Not Found' }) => {
  ErrorResponse({ res, message, status: 404 });
};

export const HandleResponse = ({ res, result }) => {
  if (result.success) {
    if ((result.value === undefined || result.value === null) && controllerName)
      NotFound({ res });
    else Ok({ res, data: result.value });
  } else {
    const data = result.error;
    if (result.forbidden) NotAuthenticated({ res, data });
    else if (result.valid) InternalServerError({ res, data });
    else BadRequest({ res, data });
  }
};
