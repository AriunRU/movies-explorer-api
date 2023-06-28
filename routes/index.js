const router = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signupRoute = require('./sign-up');
const signinRoute = require('./sign-in');
const { auth } = require('../middlewares/auth');
const NotFoundApiError = require('../errors/NotFoundApiError');
const { notFoundPage } = require('../utils/constants');

router.use('/', signupRoute);
router.use('/', signinRoute);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundApiError(notFoundPage));
});

module.exports = router;
