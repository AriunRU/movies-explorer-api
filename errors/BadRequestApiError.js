const ApiError = require('./ApiError');

class BadRequestApiError extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

module.exports = BadRequestApiError;
