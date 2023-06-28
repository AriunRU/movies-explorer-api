require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const disablePoweredBy = require('./middlewares/disablePoweredBy');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3003, DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DATABASE_URL);
app.use(disablePoweredBy);
app.use(express.json());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
