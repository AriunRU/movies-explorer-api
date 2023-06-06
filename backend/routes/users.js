const userRouter = require('express').Router();

const {
  getUser, getMe, getAllUsers, updateUser,
} = require('../controllers/users');
const { userIdValidation, userInfoValidation } = require('../utils/validations/userJoi');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getMe);
userRouter.get('/users/me', userIdValidation, getUser);
userRouter.patch('/users/me', userInfoValidation, updateUser);

module.exports = userRouter;
