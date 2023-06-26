const { MESSAGE_SUCCESS_LOGOUT } = require('../constants/constants');

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: MESSAGE_SUCCESS_LOGOUT });
  } catch (err) {
    next(err);
  }
};
