const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const NotFoundError = require('../utils/errors/not-found-err');
const ConflictError = require('../utils/errors/conflict-err');
const RequestError = require('../utils/errors/request-err');

const findUserById = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Запрашиваемые данные пользователя не найдены'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new RequestError('Переданы некорректные данные пользователя при запросе'));
      }
      return next(err);
    });
};

const getUserInfo = (req, res, next) => {
  findUserById(req.user._id, res, next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.status(201).send({
          name: user.name,
          email: user.email,
        }))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return next(new RequestError('Переданы некорректные данные в форме создания пользователя'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Введенный email занят'));
          }
          return next(err);
        });
    });
};

const changeUserInfo = (id, data, res, next) => {
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Запрашиваемые данные пользователя не найдены'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new RequestError('Переданы некорректные данные пользователя при запросе'));
      }
      return next(err);
    });
};

const changeProfile = (req, res, next) => {
  const { name, email } = req.body;
  changeUserInfo(req.user._id, { name, email }, res, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '3d' });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser, changeProfile, login, getUserInfo,
};
