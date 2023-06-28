const usersRouter = require('express').Router();

const { getCurrentUser, setUserInfo } = require('../controllers/users');
const { setUserInfoValidation } = require('../middlewares/validation');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', setUserInfoValidation, setUserInfo);

module.exports = usersRouter;
