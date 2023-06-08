const router = require('express').Router();
const NotFoundError = require('../customError/NotFoundError');
const { ERR_MESSAGE_WRONG_PAGE } = require('../constants/constants');

const usersRoutes = require('./users');
const moviesRoutes = require('./movie');

const { validateLogin, validateRegister } = require('../utils/validation');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');
const { auth } = require('../middlewares/auth');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.post('/signout', auth, logout);

router.use('*', auth, (req, res, next) => {
  const err = new NotFoundError();
  err.message = ERR_MESSAGE_WRONG_PAGE;
  next(err);
});

module.exports = router;
