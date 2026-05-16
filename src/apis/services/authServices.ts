import { apiClient } from '@/config/apis/client';
import {
  AuthPayload,
  ForgotPasswordPayload,
  LoginPayload,
  ProfileSetupPayload,
  SignupPayload,
  User,
} from '@/types/apis/auth.types';
import { ApiResponse } from '@/types/apis/common.types';
import { ENDPOINTS } from '../endPoints';

export const authServices = {
  login: async (payload: LoginPayload) => {
        const formData = new FormData();
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        formData.append('device_type', payload.device_type)

        if (payload.push_token) {
            formData.append('push_token', payload.push_token)
        }
    const response = await apiClient.post<ApiResponse<AuthPayload>>(
      ENDPOINTS.LOGIN,
      formData,
    );

    console.log(response.data);
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
    console.log(payload);
    const response = await apiClient.post<ApiResponse<AuthPayload>>(
      ENDPOINTS.SIGNUP,
      formData,
    );
    console.log(response);
    return response.data;
  },

    forgotPassword: async (payload: ForgotPasswordPayload) => {
    const formData = new FormData();
    formData.append('email', payload.email)
    const response = await apiClient.post<ApiResponse<null>>(
      ENDPOINTS.FORGOTPASSWORD,
      formData,
    );
    console.log(response.data);
    return response.data;
  },
    
  profileSetup: async (
    payload: ProfileSetupPayload,
  ) => {
    const formData = new FormData();
  
    formData.append(
      'name',
      payload.name,
    );
  
    formData.append(
      'phone',
      payload.phone,
    );
  
   
  
    formData.append('_method', 'PUT');
  
    if (payload.avatar) {
      formData.append('avatar', {
        uri: payload.avatar.uri,
  
        name:
          payload.avatar.fileName ||
          'profile.jpg',
  
        type:
          payload.avatar.type ||
          'image/jpeg',
      });
    }
  
    const response =
      await apiClient.post<
        ApiResponse<User>
      >(
        ENDPOINTS.PROFILESETUP,
        formData,
      );
  
    return response.data;
  }
    
};
