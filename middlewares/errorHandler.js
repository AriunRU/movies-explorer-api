const ApiError = require('../errors/ApiError');

module.exports = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ApiError) {
    return err.sendResponse(res);
  }
  next();
  return res.status(500).json({ message: err.message });
};
