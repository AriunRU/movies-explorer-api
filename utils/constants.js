const badRequestCreateMovie = 'Переданы некорректные данные при создании карточки фильма';
const notFoundDeleteMovie = 'Карточка фильма с указанным id не найдена';
const forbiddenDeleteMovie = 'Вы можете удалить только добавленную вами карточку';
const badRequestDeleteMovie = 'Переданы некорректные данные для удаления карточки фильма';
const successDeleteMovie = 'Карточа фильма удалена';
const notFoundUser = 'Пользователь не найден';
const badRequestFindUser = 'Передан некорректный id пользователя';
const badRequestUpdateUser = 'Передан некорректные данные при обновлении профиля';
const conflictUpdateUser = 'Данный email уже есть в базе';
const badRequestCreateUser = 'Переданы некорректные данные при создании пользователя';
const conflictCreateUser = 'Пользователь с таким email уже существует';
const emailPasswordFalse = 'Неправильная почта или пароль';
const notFoundPage = 'Страница не найдена';
const authorizationRequired = 'Необходима авторизация';
const invalidToken = 'Прислан некорректный токен';

module.exports = {
  badRequestCreateMovie,
  notFoundDeleteMovie,
  forbiddenDeleteMovie,
  badRequestDeleteMovie,
  successDeleteMovie,
  notFoundUser,
  badRequestFindUser,
  badRequestUpdateUser,
  conflictUpdateUser,
  badRequestCreateUser,
  conflictCreateUser,
  emailPasswordFalse,
  notFoundPage,
  authorizationRequired,
  invalidToken,
};
