import { clearAuth } from '@/redux/apis/auth/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { authServices } from '@/apis/services/auth.services';
import { storage } from '@/storage/asyncStorage';

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'logout'],

    mutationFn: async () => {
      const response = await authServices.logout();

      if (!response.result) {
        throw new Error(response.message);
      }

      return response.payload;
    },

    onSettled: async () => {
      // Clear the local session whether the API succeeds or fails.
      await storage.clearSession();
      dispatch(clearAuth());

      // Remove cached user-specific API data.
      queryClient.clear();
    },
  });
};
