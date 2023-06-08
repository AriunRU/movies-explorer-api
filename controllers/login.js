const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/users');
const UnauthorizedError = require('../customError/UnauthorizedError');
const BadRequestError = require('../customError/BadRequestError');
const { JWT_SECRET } = require('../config');
const { MESSAGE_SUCCESS_AUTH } = require('../constants/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError();
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new BadRequestError();
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('jwt', jwt, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: MESSAGE_SUCCESS_AUTH }).end();
    })
    .catch(next);
};
