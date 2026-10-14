import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { authServices } from '@/apis/services/auth.services';
import { storage } from '@/storage/asyncStorage';
import { LoginPayload } from '@/types/apis/auth.types';
import { setCredentials } from '@/redux/apis/auth/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['auth', 'login'],

    mutationFn: async (payload: LoginPayload) => {
      const response = await authServices.login(payload);

      if (!response.result) {
        throw new Error(response.message);
      }

      const authData = response.payload;

      // Save the session before updating Redux.
      await Promise.all([
        storage.setAccessToken(authData.access_token),
        storage.setUser(authData),
      ]);

      return authData;
    },

    onSuccess: authData => {
      dispatch(
        setCredentials({
          user: authData,
          accessToken: authData.access_token,
        }),
      );
    },
  });
};
