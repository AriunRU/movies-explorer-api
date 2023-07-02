const usersRouter = require('express').Router();

const {
  changeProfile, getUserInfo,
} = require('../controllers/users');
const { validationChangeProfile } = require('../middlewares/validation');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', validationChangeProfile, changeProfile);

module.exports = usersRouter;
