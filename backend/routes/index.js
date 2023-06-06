const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movie');

const { login, createUser, clearCookie } = require('../controllers/users');
const { userRegisterValidation, userLoginValidation } = require('../utils/validations/userJoi');
const NotFoundError = require('../utils/customError/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', userRegisterValidation, createUser);
router.post('/signin', userLoginValidation, login);

router.use(auth);

router.post('/signout', clearCookie);
router.use('/users', userRouter);
router.use('/movie', movieRouter);
router.use('*', () => { throw new NotFoundError('Страница не найдена'); });

module.exports = router;
