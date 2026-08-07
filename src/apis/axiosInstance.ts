import { parseApiError } from '@/utils/errorHandler';
import { storage } from '../storage/asyncStorage';
import axios from 'axios';
import { X_API_Key } from '@/constants/apis/xApiKey';

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
  
  error => {
    return Promise.reject(parseApiError(error));
  },
);
