import { useMutation } from '@tanstack/react-query';
import { authServices } from '@/apis/services/auth.services';
import { SignupPayload } from '@/types/apis/auth.types';

export const useSignup = () => {
  return useMutation({
    mutationKey: ['auth', 'signup'],

    mutationFn: async (payload: SignupPayload) => {
      const response = await authServices.signup(payload);

      if (!response.result) {
        throw new Error(response.message);
      }

      return response.payload;
    },
  });
};
