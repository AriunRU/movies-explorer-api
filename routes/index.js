const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const errorsRouter = require('./notfound');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', errorsRouter);

module.exports = router;
