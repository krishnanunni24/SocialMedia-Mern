import axios from 'axios'
export const API = axios.create({ baseURL: 'http://localhost:4000' });
API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Retrieve the token from wherever it's stored
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );