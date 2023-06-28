const User = require('../models/user');
const BadRequestApiError = require('../errors/BadRequestApiError');
const NotFoundApiError = require('../errors/NotFoundApiError');
const ConflictApiError = require('../errors/ConflictApiError');
const {
  notFoundUser,
  badRequestFindUser,
  badRequestUpdateUser,
  conflictUpdateUser,
} = require('../utils/constants');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundApiError(notFoundUser);
      }
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestApiError(badRequestFindUser));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  ).then((user) => {
    if (user === null) {
      throw new NotFoundApiError(notFoundUser);
    }
    res.status(200).send(user);
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestApiError(badRequestFindUser));
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestApiError(badRequestUpdateUser));
    }
    if (err.code === 11000) {
      next(new ConflictApiError(conflictUpdateUser));
    } next(err);
  });
};

module.exports = {
  getCurrentUser,
  updateProfile,
};
