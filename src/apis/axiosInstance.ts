import { parseApiError } from '@/utils/errorHandler';
import { storage } from '../storage/asyncStorage';
import axios from 'axios';
import { API_BASE_URL, X_API_Key } from '@/constants/apis/sandBox';
import { store } from '@/redux/store';
import { clearAuth } from '@/redux/apis/auth/authSlice';
import { resetToAuth } from '@/utils/navigationRef';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'X-API-Key': X_API_Key,
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await storage.getAccessToken();
    console.log(token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
      

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);

// apiClient.interceptors.request.use(
//   config => {
//     console.log('🌐 API REQUEST');
//     console.log('URL:', `${config.baseURL}${config.url}`);
//     console.log('METHOD:', config.method);
//     console.log('PARAMS:', config.params);

//     return config;
//   },
//   error => {
//     console.log('❌ REQUEST CONFIG ERROR:', error);
//     return Promise.reject(error);
//   },
// );

apiClient.interceptors.response.use(
    response => response,
   
  
  async error => {

    if (error.response?.status === 401) {
      console.log(error.response)
      await storage.clearSession();
      store.dispatch(clearAuth());
      resetToAuth();
    }

    console.log(error)

    return Promise.reject(parseApiError(error));
  },
);

// apiClient.interceptors.response.use(
//   response => {
//     console.log('✅ API RESPONSE');
//     console.log('URL:', response.config.url);
//     console.log('STATUS:', response.status);

//     return response;
//   },
//   error => {
//     console.log('❌ API ERROR');
//     console.log('message:', error.message);
//     console.log('code:', error.code);
//     console.log('config:', error.config);
//     console.log('url:', error.config?.url);
//     console.log('baseURL:', error.config?.baseURL);

//     return Promise.reject(error);
//   },
// );
