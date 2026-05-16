import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from './storageKeys';
import { User } from '@/types/apis/auth.types';


export const storage = {
  setAccessToken: async (token: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken: async () => {
    return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  removeAccessToken: async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setUser: async (user: User) => {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: async () => {
    const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);

    return user ? JSON.parse(user) : null;
  },

  clearSession: async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.USER,
    ]);
  },
};
