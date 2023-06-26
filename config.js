require('dotenv').config();

const { NODE_ENV = 'development' } = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

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

const limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  corsOptions,
  limiterOptions,
  NODE_ENV,
};
