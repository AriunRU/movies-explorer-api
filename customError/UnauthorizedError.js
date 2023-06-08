const ApplicationError = require('./ApplicationError');

module.exports = class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'UnauthorizedError';
  }
};
