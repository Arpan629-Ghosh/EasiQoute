import { apiClient } from '@/apis/axiosInstance';
import {
  Clients,
  CreateClient,
  GetClients,
  GetClientsPayload,
} from '@/types/apis/client.types';
import { ApiResponse } from '@/types/apis/common.types';
import { ENDPOINTS } from '../endPoints';

export const clientServices = {
  createClients: async (payload: CreateClient) => {
    const formData = new FormData();
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('name', payload.name);
    formData.append('company_name', payload.company_name);
    formData.append('address', payload.address);
    formData.append('city', payload.city);
    formData.append('postcode', payload.postcode);
    formData.append('country', payload.country);

    const response = await apiClient.post<ApiResponse<Clients>>(
      ENDPOINTS.CLIENT,
      formData,
    );

    return response.data;
  },

  getClients: async (payload: GetClients) => {
    const response = await apiClient.get<ApiResponse<GetClientsPayload>>(
      ENDPOINTS.CLIENT,
      {
        params: {
          search: payload.search,
          sort_by: payload.sort_by,
          page: payload.page,
        },
      },
    );

    return response.data;
  },

  showClientDetails: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<Clients>>(
      `${ENDPOINTS.CLIENT}/${payload}`,
    );

    return response.data;
  },

  updateClient: async (payload: CreateClient) => {
    const response = await apiClient.put<ApiResponse<Clients>>(
      `${ENDPOINTS.CLIENT}/${payload.id}`, payload
    )
    return response.data;
  },

  deleteClient: async (payload: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.CLIENT}/${payload}`,
    );

    return response.data;
  }
};
