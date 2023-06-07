const ApplicationError = require('../customError/ApplicationError');

module.exports.appErrorHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  if (err) {
    const defautlError = new ApplicationError();
    res.status(defautlError.status).send({ message: defautlError.message });
    return;
  }

  next();
};
