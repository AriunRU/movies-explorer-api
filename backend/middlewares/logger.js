const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'request.log',
      maxsize: 1000000,
      maxFiles: 5,
    }),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      maxsize: 1000000,
      maxFiles: 5,
    }),
  ],
  format: winston.format.json(),
});

module.exports.startLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'app.log',
      maxsize: 1000000,
      maxFiles: 5,
    }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
});
