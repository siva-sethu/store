import axios from 'axios';
import {API} from '../constants';

const instance = axios.create({
  baseURL: API.baseUrls[API.currentEnv],
});

instance.interceptors.request.use(function (config) {
  return {
    ...config,
    params: config.params || {},
    headers: config.headers
      ? {
          ...config.headers,
        }
      : null,
  };
});

const responseBody = response => response.data;

const requests = {
  get: (url, headers, params) =>
    instance.get(url, {headers, params}).then(responseBody),

  post: (url, body, headers) =>
    instance.post(url, body, {headers}).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
