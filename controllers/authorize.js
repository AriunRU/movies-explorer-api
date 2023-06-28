const { NODE_ENV, JWT_SECRET } = process.env;
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'jwt', { expiresIn: '7d' });
      res.status(200).send({ token: jwt });
    }).catch(next);
};

module.exports = login;
