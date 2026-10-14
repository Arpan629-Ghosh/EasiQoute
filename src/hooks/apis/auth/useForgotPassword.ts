import { useMutation } from '@tanstack/react-query';
import { authServices } from '@/apis/services/auth.services';
import { ForgotPasswordPayload } from '@/types/apis/auth.types';

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['auth', 'forgotPassword'],

    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await authServices.forgotPassword(payload);

      if (!response.result) {
        throw new Error(response.message);
      }

      return response.message;
    },
  });
};
