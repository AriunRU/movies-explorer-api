const ApiError = require('./ApiError');

class ForbiddenApiError extends ApiError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

module.exports = ForbiddenApiError;
