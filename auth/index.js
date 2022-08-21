import jwt from "jsonwebtoken";

export const sign = (data, options = {}) =>
  jwt.sign(data, "some-hash", options);
export const verify = (data) => jwt.verify(data, "some-hash");
