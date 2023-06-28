const ApiError = require('./ApiError');

class NotFoundApiError extends ApiError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

module.exports = NotFoundApiError;
