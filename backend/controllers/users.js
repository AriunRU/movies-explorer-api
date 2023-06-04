const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const BadRequestError = require('../utils/customError/BadRequestError');
const NotFoundError = require('../utils/customError/NotFoundError');
const ConflictError = require('../utils/customError/ConflictError');
const UnauthorizedError = require('../utils/customError/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((newUser) => {
      res.status(200).send({
        name: newUser.name,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данной почтой уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные при обновлении пользователя'));
      } return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isEqual) => {
          if (!isEqual) {
            throw new UnauthorizedError('Неверный email или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.status(200).send({ token });
        });
    })
    .catch(next);
};

const currentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => { next(err); });
};

const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные при обновлении пользователя'));
      } return next(err);
    });
};

module.exports = {
  createUser, currentUser, login, updateUser,
};
