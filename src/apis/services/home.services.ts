import { apiClient } from '@/apis/axiosInstance';
import { ApiResponse } from '@/types/apis/common.types';
import { ENDPOINTS } from '../endPoints';
import { HomeScreenResponse } from '@/types/apis/home.types';

export const homeService = {
  homeScreenData: async () => {
    const response = await apiClient.get<ApiResponse<HomeScreenResponse>>(
      ENDPOINTS.HOME,
    );

    return response.data;
  },
};
