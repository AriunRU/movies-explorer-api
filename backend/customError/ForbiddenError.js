const ApplicationError = require('./ApplicationError');
const { ERR_FORBIDDEN, ERR_MESSAGE_FORBIDDEN } = require('../utils/constants');

module.exports = class ForbiddenError extends ApplicationError {
  constructor() {
    super(ERR_FORBIDDEN, ERR_MESSAGE_FORBIDDEN);
    this.name = 'ForbiddenError';
  }
};
