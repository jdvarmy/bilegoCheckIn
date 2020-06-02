import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const http = superagentPromise(_superagent, Promise);
const URL = 'https://api.bilego.ru/api/checkin/';

const handleCatch = (url, err) => {
  const error = JSON.parse(err.message);
  let message = '';
  switch (error.errors[0].title) {
    case 'Invalid Attribute':
      message = 'Это не билет от Bilego';
      break;
    case 'Bad connection':
      message = 'Ошибка соединения с сервером';
      break;
    case 'User and organizer do not match':
      message = 'Это событие зарегистрировано на другого организатора';
      break;
    case 'Internal server error':
      message = 'Ошибка сервера';
      break;
    default:
      message = 'Ошибка приложения';
  }
  return new Promise((resolve, reject) => {
    throw new Error(message);
  });
};

const pluginSet = request => {};

const responseBody = res => res.body || res.text;


export default {
  post: (url, query = {}, body = {}) =>
    http
      .post(`${URL}${url}`, body)
      .query(query)
      .use(pluginSet)
      .end()
      .then(responseBody)
      .catch(err => handleCatch(url, err)),
  token: (url, body = {}, query = {}) =>
    http
      .post(url, body)
      .query(query)
      .use(pluginSet)
      .end()
      .then(responseBody)
      .catch(err => alert('Неверный логин или пароль')),
  validate: (url, body = {}, query = {}, token) =>
    http
      .post(url, body)
      .query(query)
      .use((request) => {
        request.set('Authorization', `Bearer ${token}`);
        request.set('Access-Control-Allow-Headers', `Authorization, Content-Type`);
      })
      .end()
      .then(responseBody)
      .catch(err => console.log(err))
};
