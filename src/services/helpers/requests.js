import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const http = superagentPromise(_superagent, this.Promise || require('promise'));
const URL = 'https://api.bilego.ru/api/checkin/';

const handleCatch = (url, err) => {
  console.log(url, err);
};

const responseBody = res => res.body || res.text;

const tokenPlugin = request => {};

export default {
  post: (url, query = {}, body = {}) =>
    http
      .post(`${URL}${url}`, body)
      .query(query)
      .use(tokenPlugin)
      .end()
      .then(responseBody)
      .catch(err => handleCatch(url, err))
};
