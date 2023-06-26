const { ERR_INTERNAL_SERVER, ERR_MESSAGE_INTERNAL_SERVER } = require('../constants/constants');

module.exports = class ApplicationError extends Error {
  constructor(status = ERR_INTERNAL_SERVER, message = ERR_MESSAGE_INTERNAL_SERVER) {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
