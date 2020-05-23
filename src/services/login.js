import requests from './helpers/requests';
import storage from './helpers/storage';

const _user_key = '_bilego_user',
  _token_key = '_bilego_token';

export default {
  login: (params) => requests.token('https://mos.bilego.ru/wp-json/jwt-auth/v1/token', {}, params),
  validate: (token) => requests.validate('https://mos.bilego.ru/wp-json/jwt-auth/v1/token/validate', {}, {}, token),

  setToken: storage.set.bind(null, _token_key),
  getToken: storage.get.bind(null, _token_key),
  setUser: storage.set.bind(null, _user_key),
  getUser: storage.get.bind(null, _user_key),
  clear: () => {
    storage.remove(_user_key);
    storage.remove(_token_key);
  }
}
