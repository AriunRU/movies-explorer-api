const ApplicationError = require('./ApplicationError');
const { ERR_NOT_FOUND, ERR_MESSAGE_NOT_FOUND } = require('../constants/constants');

module.exports = class NotFoundError extends ApplicationError {
  constructor() {
    super(ERR_NOT_FOUND, ERR_MESSAGE_NOT_FOUND);
    this.name = 'NotFoundError';
  }
};
