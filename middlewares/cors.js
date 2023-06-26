const corsOptions = {
  origin: [
    'https://ariun-movies.nomoredomains.rocks',
    'http://ariun-movies.nomoredomains.rocks',
    'https://api.ariun-movies.nomoredomains.rocks',
    'http://api.ariun-movies.nomoredomains.rocks',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  maxAge: 60,
  optionsSuccessStatus: 204,
};

module.exports = {
  corsOptions,
};
