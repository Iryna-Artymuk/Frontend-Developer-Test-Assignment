import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
});

instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('access_token');
  config.headers.token = ` ${token}`;
  return config;
});

export default instance;
