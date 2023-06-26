const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

const { validateInfoUser } = require('../utils/validation');

router.get('/users/me', getUser);
router.patch('/users/me', validateInfoUser, updateUserInfo);

module.exports = router;
