const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000,
  delayMs: 0,
  max: 100,
  message: JSON.stringify({
    error: 'Вы отправили подозрительно много запросов за минуту',
    code: 429,
  }),
});
