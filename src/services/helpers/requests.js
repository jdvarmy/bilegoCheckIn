import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

import storage from './storage';

const http = superagentPromise(_superagent, Promise);
const URL = 'https://api.bilego.ru/api/checkin/';

const handleCatch = (url, err) => {
  console.log(url, err);
};

const plugin = request => {};

const responseBody = res => res.body || res.text;

export default {
  post: (url, query = {}, body = {}) =>
    http
      .post(`${URL}${url}`, body)
      .query(query)
      .use(plugin)
      .end()
      .then(responseBody)
      .catch(err => handleCatch(url, err)),
  token: (url, body = {}, query = {}) =>
    http
      .post(url, body)
      .query(query)
      .use(plugin)
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
