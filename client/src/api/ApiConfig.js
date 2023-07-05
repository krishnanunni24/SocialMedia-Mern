import axios from 'axios'
import store from '../store/reduxStore';
export const API = axios.create({ baseURL: 'http://localhost:4000' });
API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Retrieve the token from wherever it's stored
      const userId = store.getState().authReducer.authData.user._id
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (userId) {
        config.headers['X-User-Id'] = userId;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );