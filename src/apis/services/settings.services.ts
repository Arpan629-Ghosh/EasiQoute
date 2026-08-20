import { apiClient } from '@/apis/axiosInstance';
import { Company, CompanyPayload } from '@/types/apis/auth.types';
import { ApiResponse } from '@/types/apis/common.types';
import { ENDPOINTS } from '../endPoints';
import {
  ChangePassword,
  CreateCategories,
  CreateCategoriesPayload,
  FetchCategoriesPayload,
  CreateSubCategories,
  SubCategoriesPayload,
  FetchSubCategoriesPayload,
  CreateItems,
  CreateItemsPayload,
  FetchItemsPayload,
  CreateTeamMemberPayload,
  FetchTeamMembersPayload,
} from '@/types/apis/settings.types';

export const settingsServices = {
  companyProfileUpdate: async (payload: CompanyPayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', payload.name);
    formData.append('phone', payload.phone_number);
    formData.append('address', payload.address);
    formData.append('city', payload.city);
    formData.append('country', payload.country);
    formData.append('postcode', payload.postcode);
    if (payload.logo) {
      formData.append('avatar', {
        uri: payload.logo.uri,

        name: payload.logo.fileName || 'profile.jpg',

        type: payload.logo.type || 'image/jpeg',
      });
    }
    formData.append('brand_color', payload.brand_color);
    formData.append('vat_number', payload.vat_number);
    const response = await apiClient.post<ApiResponse<Company>>(
      ENDPOINTS.COMPANYPROFILESETUP,
      formData,
      {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      }
    );

    return response.data;
  },

  changePassword: async (payload: ChangePassword) => {
    const formData = new FormData();
    formData.append('old_password', payload.old_password);
    formData.append('new_password', payload.new_password);

    const response = await apiClient.post<ApiResponse<null>>(
      ENDPOINTS.CHANGEPASSWORD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  newCategory: async (payload: CreateCategories) => {
    const formData = new FormData();
    if (payload.id) {
      formData.append('id', payload.id);
    }

    formData.append('name', payload.name);

    const response = await apiClient.post<ApiResponse<CreateCategoriesPayload>>(
      ENDPOINTS.CATEGORIES,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  fetchNewCategories: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<FetchCategoriesPayload>>(
      ENDPOINTS.CATEGORIES,
      {
        params: { page: payload },
      },
    );

    return response.data;
  },
  deleteCategory: async (payload: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.CATEGORIES}/${payload}`,
    );

    return response.data;
  },

  newSubCategory: async (payload: CreateSubCategories) => {
    const formData = new FormData();
    if (payload.id) {
      formData.append('id', payload.id);
    }
    formData.append('category_id', payload.category_id);
    formData.append('name', payload.name);

    const response = await apiClient.post<ApiResponse<SubCategoriesPayload>>(
      ENDPOINTS.SUBCATEGORIES,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  fetchNewSubCategories: async (payload: number) => {
    const response = await apiClient.get<
      ApiResponse<FetchSubCategoriesPayload>
    >(ENDPOINTS.SUBCATEGORIES, {
      params: { page: payload },
    });
    return response.data;
  },

  deleteSubCategory: async (payload: CreateSubCategories) => {
    const formData = new FormData();
    formData.append('id', payload.id);
    formData.append('category_id', payload.category_id);
    formData.append('name', payload.name);
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.SUBCATEGORIES}/${payload.id}`,
      {
        data: formData,
      },
    );
    return response.data;
  },

  createItems: async (payload: CreateItems) => {
    const response = await apiClient.post<ApiResponse<CreateItemsPayload>>(
      ENDPOINTS.ITEMS,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },

  fetchItems: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<FetchItemsPayload>>(
      ENDPOINTS.FETCHITEMS,
      {
        params: { page: payload },
      },
    );
    return response.data;
  },

  deleteItem: async (payload: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.FETCHITEMS}/${payload}`,
    );

    return response.data;
  },

  createTeamMember: async (payload: CreateTeamMemberPayload) => {
    const formData = new FormData();

    if (payload.id) formData.append('id', payload.id);

    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('password', payload.password);

    const response = await apiClient.post<ApiResponse<CreateTeamMemberPayload>>(
      ENDPOINTS.TEAMMEMBER,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  fetchTeamMembers: async (payload: FetchTeamMembersPayload) => {
    const params: Record<string, string | number> = {
      page: payload.page,
    };

    if (payload.search?.trim()) {
      params.search = payload.search.trim();
    }

    const response = await apiClient.get<ApiResponse<FetchTeamMembersPayload>>(
      ENDPOINTS.TEAMMEMBER,
      { params },
    );

    return response.data;
  },
};
