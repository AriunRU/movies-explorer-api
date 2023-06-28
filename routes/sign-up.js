const router = require('express').Router();
const register = require('../controllers/register');
const { validateRegister } = require('../utils/validation');

router.post('/signup', validateRegister, register);

module.exports = router;
