const ApiError = require('./ApiError');

class UnauthorizedApiError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

module.exports = UnauthorizedApiError;
