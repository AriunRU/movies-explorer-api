const userRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createUser, currentUser, updateUser,
} = require('../controllers/users');
const { getUserByIdValidation, updateUserProfileValidation } = require('../../utils/validations/userJoi');

userRouter.post('/users', createUser);
userRouter.get('/users/me', celebrate(getUserByIdValidation), currentUser);
userRouter.patch('/users/me', celebrate(updateUserProfileValidation), updateUser);

module.exports = userRouter;
