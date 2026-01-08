import axios from 'axios';
import { ENV_CONFIG } from '../config/env';

const axiosClient = axios.create({
  baseURL: ENV_CONFIG.API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
        console.error("Hết phiên đăng nhập!");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;