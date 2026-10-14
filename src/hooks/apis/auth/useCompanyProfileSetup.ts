import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { authServices } from '@/apis/services/auth.services';
import { storage } from '@/storage/asyncStorage';
import { RootState } from '@/redux/store';
import { CompanyPayload } from '@/types/apis/auth.types';
import { setUser } from '@/redux/apis/auth/authSlice';

export const useCompanyProfileSetup = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  return useMutation({
    mutationKey: ['auth', 'companyProfileSetup'],

    mutationFn: async (payload: CompanyPayload) => {
      const response = await authServices.companyProfileSetup(payload);

      if (!response.result) {
        throw new Error(response.message);
      }

      return response.payload;
    },

    onSuccess: async () => {
      if (!user) {
        return;
      }

      const updatedUser = {
        ...user,
        is_company_profile_setup: true,
      };

      dispatch(setUser(updatedUser));
      await storage.setUser(updatedUser);
    },
  });
};
