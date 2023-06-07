const ApplicationError = require('./ApplicationError');
const { ERR_UNAUTHORIZED, ERR_MESSAGE_UNAUTHORIZED } = require('../utils/constants');

module.exports = class UnauthorizedError extends ApplicationError {
  constructor() {
    super(ERR_UNAUTHORIZED, ERR_MESSAGE_UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
};
