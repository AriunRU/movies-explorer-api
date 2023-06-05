const allowedCors = [
  'https://ariun-movies.nomoredomains.rocks',
  'http://ariun-movies.nomoredomains.rocks',
  'https://api.ariun-movies.nomoredomains.rocks',
  'http://api.ariun-movies.nomoredomains.rocks',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
