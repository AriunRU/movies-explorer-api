const BadRequest = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const Forbidden = require('./ForbiddenError');
const NotFound = require('./NotFoundError');
const Unauthorized = require('./UnauthorizedError');

module.exports = {
  BadRequest, ConflictError, Forbidden, NotFound, Unauthorized,
};
