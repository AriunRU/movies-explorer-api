const router = require('express').Router();
const authorize = require('../controllers/authorize');
const { validateAuthorize } = require('../utils/validation');

router.post('/signin', validateAuthorize, authorize);

module.exports = router;
