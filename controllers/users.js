const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/users');
const UnauthorizedError = require('../customError/UnauthorizedError');
const NotFoundError = require('../customError/NotFoundError');
const BadRequestError = require('../customError/BadRequestError');
const ConflictError = require('../customError/ConflictError');
const { JWT_SECRET } = require('../config');
const { MESSAGE_SUCCESS_AUTH, STATUS_OK_CREATED } = require('../utils/constants');

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
      throw new UnauthorizedError();
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

module.exports.createUser = (req, res, next) => {
  const { password } = req.body;
  return bcrypt.hash(password, 10).then((hash) => User.create({
    ...req.body, password: hash,
  })
    .then((user) => res.status(STATUS_OK_CREATED).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        const conflictErr = new ConflictError();
        next(conflictErr);
      } else if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new BadRequestError();
        validationError.message = err.message;
        next(validationError);
      } else {
        next(err);
      }
    }));
};

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const id = req.user._id;

  return User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
  }, {
    new: true,
    runValidators: true,
  }).orFail(() => {
    throw new NotFoundError();
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        const conflictErr = new ConflictError();
        next(conflictErr);
      } else if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new BadRequestError();
        validationError.message = err.message;
        next(validationError);
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt')
    .end();
};
