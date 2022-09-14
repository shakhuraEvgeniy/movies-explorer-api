const token = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NEEN_AUTHORIZATION } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { jwt } = req.cookies;
  let payload;
  try {
    if (!jwt) {
      return next(new UnauthorizedError(NEEN_AUTHORIZATION));
    }
    payload = token.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new UnauthorizedError(NEEN_AUTHORIZATION);
    return next(err);
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
