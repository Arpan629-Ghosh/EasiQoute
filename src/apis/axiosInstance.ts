import { parseApiError } from '@/utils/errorHandler';
import { storage } from '../storage/asyncStorage';
import axios from 'axios';
import { X_API_Key } from '@/constants/apis/xApiKey';
import { store } from '@/redux/store';
import { clearAuth } from '@/redux/apis/auth/authSlice';
import { resetToAuth } from '@/utils/navigationRef';

export const apiClient = axios.create({
  baseURL: 'https://sandbox.eaziquote.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'X-API-Key': X_API_Key,
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await storage.getAccessToken();

    if(token)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
    response => response,
   
  
  async error => {

    if (error.response?.status === 401) {
      await storage.clearSession();
      store.dispatch(clearAuth());
      resetToAuth();
    }

    return Promise.reject(parseApiError(error));
  },
);
