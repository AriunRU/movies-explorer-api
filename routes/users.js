const router = require('express').Router();
const { validateUpdateProfile } = require('../utils/validation');
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

// GET /users/me возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);
// PATCH /users/me обновляет информацию о пользователе (email и имя)
router.patch('/me', validateUpdateProfile, updateProfile);

module.exports = router;
