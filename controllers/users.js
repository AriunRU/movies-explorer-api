const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { handleError } = require('../ustils/handleError');
const {
  checkJWT,
  DELETE_MESSAGE,
  NOT_FOUND_MESSAGE,
  CREATED_CODE,
  OK_CODE,
} = require('../ustils/config');

const { NODE_ENV } = process.env;

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(CREATED_CODE).send(newUser);
    })
    .catch((err) => handleError(err, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentails(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        checkJWT,
        { expiresIn: '7d' },
      );
      const newUser = user.toObject();
      delete newUser.password;
      console.log(token);
      return res.cookie(
        'jwt',
        token,
        {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: 3600000 * 24 * 7,
        },
      )
        .send(newUser);
    })
    .catch(next);
};

const logout = (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: DELETE_MESSAGE });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => handleError(err, next));
};

const setUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    _id,
    { name, email },
    { new: true, runValidators: true },
  ).then((user) => {
    if (!user) {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    }
    return res.status(OK_CODE).send(user);
  }).catch((err) => handleError(err, next));
};

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
  setUserInfo,
};
