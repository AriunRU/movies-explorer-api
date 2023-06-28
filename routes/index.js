const router = require('express').Router();

const { createUser, login, logout } = require('../controllers/users');
const { registrationValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { NOT_FOUND_PATH_MESSAGE } = require('../ustils/config');

router.post('/signup', registrationValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.post('/signout', logout);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PATH_MESSAGE));
});

module.exports = router;
