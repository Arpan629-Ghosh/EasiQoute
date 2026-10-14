import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { authServices } from '@/apis/services/auth.services';
import { storage } from '@/storage/asyncStorage';
import { setUser } from '@/redux/apis/auth/authSlice';
import { ProfileSetupPayload } from '@/types/apis/auth.types';

export const useProfileSetup = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ['auth', 'profileSetup'],

    mutationFn: async (payload: ProfileSetupPayload) => {
      const response = await authServices.profileSetup(payload);

      if (!response.result) {
        throw new Error(response.message);
      }

      return response.payload;
    },

    onSuccess: async updatedUser => {
      dispatch(setUser(updatedUser));
      await storage.setUser(updatedUser);
    },
  });
};
