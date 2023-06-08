module.exports.ERR_BAD_REQUEST = 400;
module.exports.ERR_UNAUTHORIZED = 401;
module.exports.ERR_FORBIDDEN = 403;
module.exports.ERR_NOT_FOUND = 404;
module.exports.ERR_CONFLICT = 409;
module.exports.ERR_INTERNAL_SERVER = 500;

module.exports.STATUS_OK_CREATED = 201;

module.exports.ERR_MESSAGE_BAD_REQUEST = 'Переданы неверные данные';
module.exports.ERR_MESSAGE_UNAUTHORIZED = 'Пользователь не авторизован';
module.exports.ERR_MESSAGE_FORBIDDEN = 'Пользователь не является владельцем';
module.exports.ERR_MESSAGE_NOT_FOUND = 'Документ не найден';
module.exports.ERR_MESSAGE_WRONG_PAGE = 'Страница не найдена';
module.exports.ERR_MESSAGE_CONFLICT_EMAIL = 'Пользователь с этим адресом почты уже существует.';
module.exports.ERR_MESSAGE_CONFLICT_MOVIE_ID = 'Фильм с таким ID уже добавлен в избраное';
module.exports.ERR_MESSAGE_INTERNAL_SERVER = 'Общая проблема с сервером';

module.exports.MESSAGE_FAILED_AUTH = 'Неверный логин или пароль';
module.exports.MESSAGE_SUCCESS_AUTH = 'Успешная авторизация';
module.exports.MESSAGE_SUCCESS_LOGOUT = 'Успешный выход';
module.exports.REGEX = /^https?:\/\/(?:www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+(?:#[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+)?$/m;
