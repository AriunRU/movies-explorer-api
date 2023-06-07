const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const NotFoundError = require('../customError/NotFoundError');
const BadRequestError = require('../customError/BadRequestError');
const ConflictError = require('../customError/ConflictError');
const { STATUS_OK_CREATED } = require('../utils/constants');

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
    .catch(() => {
      next(req);
      /* if (err.code === 11000) {
        const conflictErr = new ConflictError();
        next(conflictErr);
      } else if (err instanceof mongoose.Error.ValidationError) {
        const validationError = new BadRequestError();
        validationError.message = req;
        next(validationError);
      } else {
        next(err);
      } */
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
