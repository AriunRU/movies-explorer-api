const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedApiError = require('../errors/UnauthorizedApiError');
const { emailPasswordFalse } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: { validator: validator.isEmail, message: 'Введите корректный email' },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedApiError(emailPasswordFalse));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedApiError(emailPasswordFalse));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
