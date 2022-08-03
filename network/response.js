exports.success = ({ req, res, message = "", data = {}, status = 200 }) => {
  res.status(status).send({
    error: false,
    status,
    message,
    body: data,
  });
};

exports.error = ({
  req,
  res,
  message = "Internal server error",
  data = {},
  status = 500,
}) => {
  res.status(status).send({
    error: true,
    status,
    message,
    body: data,
  });
};