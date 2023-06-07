const ApplicationError = require('./ApplicationError');
const { ERR_BAD_REQUEST, ERR_MESSAGE_BAD_REQUEST } = require('../utils/constants');

module.exports = class BadRequestError extends ApplicationError {
  constructor() {
    super(ERR_BAD_REQUEST, ERR_MESSAGE_BAD_REQUEST);
    this.name = 'BadRequestError';
  }
};
