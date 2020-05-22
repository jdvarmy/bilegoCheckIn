import requests from './helpers/requests';

export default {
  login: (filterParams) =>
    requests.post('login', {}, filterParams),
}
