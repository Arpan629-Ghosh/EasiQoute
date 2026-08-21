import { apiClient } from '@/apis/axiosInstance';
import {
  AuthPayload,
  CompanyPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ProfileSetupPayload,
  SearchAddressPayload,
  SignupPayload,
  User,
  UserDeatails,
} from '@/types/apis/auth.types';
import { ApiResponse } from '@/types/apis/common.types';
import { ENDPOINTS } from '../endPoints';

export const authServices = {
  login: async (payload: LoginPayload) => {
    const formData = new FormData();
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    formData.append('device_type', payload.device_type);

    if (payload.push_token) {
      formData.append('push_token', payload.push_token);
    }
   
    const response = await apiClient.post<ApiResponse<AuthPayload>>(
      ENDPOINTS.LOGIN,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(response)

    return response.data;
  },

  signup: async (payload: SignupPayload) => {
    const formData = new FormData();

    formData.append('email', payload.email);

    formData.append('password', payload.password);

    formData.append('device_type', payload.device_type);

    if (payload.push_token) {
      formData.append('push_token', payload.push_token);
    }
    // console.log(payload);
    const response = await apiClient.post<ApiResponse<AuthPayload>>(
      ENDPOINTS.SIGNUP,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    // console.log(response);
    return response.data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const formData = new FormData();
    formData.append('email', payload.email);
    const response = await apiClient.post<ApiResponse<null>>(
      ENDPOINTS.FORGOTPASSWORD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    // console.log(response.data);
    return response.data;
  },

  profileSetup: async (payload: ProfileSetupPayload) => {
    const formData = new FormData();

    formData.append('name', payload.name);

    formData.append('phone', payload.phone);

    formData.append('_method', 'PUT');

    if (payload.avatar) {
      formData.append('avatar', {
        uri: payload.avatar.uri,

        name: payload.avatar.fileName || 'profile.jpg',

        type: payload.avatar.type || 'image/jpeg',
      });
    }

    const response = await apiClient.post<ApiResponse<User>>(
      ENDPOINTS.PROFILESETUP,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  companyProfileSetup: async (payload: CompanyPayload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('phone', payload.phone_number);
    formData.append('address', payload.address);
    formData.append('city', payload.city);
    formData.append('country', payload.country);
    formData.append('postcode', payload.postcode);
    if (payload.logo) {
      formData.append('logo', {
        uri: payload.logo.uri,

        name: payload.logo.fileName || 'profile.jpg',

        type: payload.logo.type || 'image/jpeg',
      });
    }
    formData.append('brand_color', payload.brand_color);
    formData.append('vat_number', payload.vat_number);
    const response = await apiClient.post<ApiResponse<User>>(
      ENDPOINTS.COMPANYPROFILESETUP,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  getUserDetails: async () => {
    const response = await apiClient.get<ApiResponse<UserDeatails>>(
      ENDPOINTS.USER
    );

    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post<ApiResponse<null>>(ENDPOINTS.LOGOUT);
    return response.data;
  },

  searchAddress: async (payload: string) => {
    const response = await apiClient.get<ApiResponse<SearchAddressPayload[]>>(
      ENDPOINTS.SEARCHADDRESS,
      {
        params: { postcode: payload },
      },
    );
    return response.data;
  },
};
