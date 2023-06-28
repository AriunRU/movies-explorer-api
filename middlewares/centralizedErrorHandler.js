const { SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE } = require('../ustils/config');

module.exports.centralizedErrorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
  }
  next();
};
