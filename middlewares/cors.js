const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../ustils/config');

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  // список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // обработка простых запросов CORS
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-Origin', '*');
  }
  // обработка предварительных запросов CORS
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    console.log(requestHeaders);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  return next();
};
