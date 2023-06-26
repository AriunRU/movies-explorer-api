const ApplicationError = require('./ApplicationError');
const { ERR_CONFLICT, ERR_MESSAGE_CONFLICT_EMAIL } = require('../constants/constants');

module.exports = class ConflictError extends ApplicationError {
  constructor() {
    super(ERR_CONFLICT, ERR_MESSAGE_CONFLICT_EMAIL);
    this.name = 'ConflictError';
  }
};
