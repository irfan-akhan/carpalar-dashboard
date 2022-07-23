import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://stark-scrubland-57145.herokuapp.com',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;
