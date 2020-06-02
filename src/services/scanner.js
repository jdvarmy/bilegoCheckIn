import requests from './helpers/requests';

export default {
  ticketCheck: (params) => requests.post('check', {}, params),
}
