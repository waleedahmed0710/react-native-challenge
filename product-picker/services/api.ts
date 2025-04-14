import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.111:3001', //Will be replace with my phone IP for testing
});

export default api;
