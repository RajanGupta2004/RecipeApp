import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.102.29:8000/api/v1',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});
