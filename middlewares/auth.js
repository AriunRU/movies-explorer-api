const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedApiError = require('../errors/UnauthorizedApiError');
const {
  authorizationRequired,
  invalidToken,
} = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedApiError(authorizationRequired);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new UnauthorizedApiError(invalidToken);
    }
    throw new UnauthorizedApiError(authorizationRequired);
  }
  req.user = payload;
  return next();
};
