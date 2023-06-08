const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const UnauthorizedError = require('../customError/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  let payload;
  const { jwt } = req.cookies;
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch {
    throw new UnauthorizedError('Необходима регистрация');
  }

  req.user = payload;
  next();
};
