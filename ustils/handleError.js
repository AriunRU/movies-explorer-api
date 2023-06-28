const { default: mongoose } = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { BAD_REQUEST_MESSAGE, CONFLICT_MESSAGE } = require('./config');

module.exports.handleError = (err, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return next(new BadRequestError(BAD_REQUEST_MESSAGE));
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError(BAD_REQUEST_MESSAGE));
  }
  if (err.code === 11000) {
    return next(new ConflictError(CONFLICT_MESSAGE));
  }
  return next(err);
};
