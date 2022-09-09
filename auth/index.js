import jwt from 'jsonwebtoken';
import config from '../config.js';

const secret = config.jwt.token;

export const sign = (data, options = {}) => jwt.sign(data, secret, options);

export const verify = (data) => jwt.verify(data, secret);

export const getToken = (authorization) => {
  if (!authorization) throw new Error('Empty token');
  if (authorization.indexOf('Bearer ') === -1) throw new Error('Empty token');
  let token = authorization.replace('Bearer ', '');
  return token;
};

export const decodeHeader = (req) => {
  const authorization = req.headers.authorization || null;
  if (!authorization) return new Error('Token needed');
  const token = getToken(authorization);
  const decoded = verify(token);
  req.userId = decoded.userId;
  return decoded;
};

export const validate = (req) => {
  const decoded = decodeHeader(req);
  return req.params.id === decoded.userId;
};
