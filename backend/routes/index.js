const router = require('express').Router();
const { celebrate } = require('celebrate');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movie');

const { login, createUser } = require('../controllers/users');
const { signUpValidation, signInValidation } = require('../utils/validations/userJoi');
const NotFoundError = require('../utils/customError/NotFoundError');

router.post('/signup', celebrate(signUpValidation), createUser);
router.post('/signin', celebrate(signInValidation), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movie', movieRouter);
router.use('*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = router;
