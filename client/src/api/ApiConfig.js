import axios from 'axios'
import store from '../store/reduxStore';
export const API = axios.create({ baseURL : process.env.SERVER_BASE_URL });
API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Retrieve the token from wherever it's stored
      const userId = store.getState().authReducer?.authData?._id
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (userId) {
        config.headers['x-user-id'] = userId;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );