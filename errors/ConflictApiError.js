const ApiError = require('./ApiError');

class ConflictApiError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

module.exports = ConflictApiError;
