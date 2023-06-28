const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_LOGIN_MESSAGE } = require('../ustils/config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  statics: {
    findUserByCredentails(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            throw new UnauthorizedError(UNAUTHORIZED_LOGIN_MESSAGE);
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new UnauthorizedError(UNAUTHORIZED_LOGIN_MESSAGE);
              }
              return user;
            });
        });
    },
  },
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
