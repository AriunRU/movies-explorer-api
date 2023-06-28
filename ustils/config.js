const { PORT = 3000, DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const regexUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_SECRET_DEV = 'some-secret-key';
const ID_DEV = '6453eb794cc906a7f9131c00';

const checkJWT = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV;
// статус ответа
const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const SERVER_ERROR_CODE = 500;
// сообщение ответа
const FORBIDDEN_MESSAGE = 'Невозможно удалить чужие данные';
const NOT_FOUND_MESSAGE = 'Данные с указанным id не найдены';
const NOT_FOUND_PATH_MESSAGE = 'Ресурс не найден. Проверьте URL и метод запроса';
const DELETE_MESSAGE = 'Данные удалены';
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const CONFLICT_MESSAGE = 'При регистрации указан email, который уже существует на сервере';
const UNAUTHORIZED_AUTH_MESSAGE = 'Необхадима авторизация';
const UNAUTHORIZED_LOGIN_MESSAGE = 'Неправильные почта или пароль';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3000',
  'http://158.160.38.132:3000',
  'http://158.160.38.132',
  'https://158.160.38.132',
  'https://marsello.diploma.nomoredomains.rocks',
  'https://marsello.diploma.nomoredomains.rocks',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  PORT,
  DATABASE_URL,
  regexUrl,
  JWT_SECRET_DEV,
  ID_DEV,
  checkJWT,
  OK_CODE,
  CREATED_CODE,
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  SERVER_ERROR_CODE,
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  NOT_FOUND_PATH_MESSAGE,
  DELETE_MESSAGE,
  BAD_REQUEST_MESSAGE,
  CONFLICT_MESSAGE,
  UNAUTHORIZED_AUTH_MESSAGE,
  UNAUTHORIZED_LOGIN_MESSAGE,
  SERVER_ERROR_MESSAGE,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
