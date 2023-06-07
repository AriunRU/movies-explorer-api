const router = require('express').Router();
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

const { validateInfoUser } = require('../utils/validation');

router.get('/me', getUser);
router.patch('/me', validateInfoUser, updateUserInfo);

module.exports = router;
