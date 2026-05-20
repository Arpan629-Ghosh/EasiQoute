import { apiClient } from "@/config/apis/client";
import { Company } from "@/types/apis/auth.types";
import { ApiResponse } from "@/types/apis/common.types";
import { ENDPOINTS } from "../endPoints";
import { ChangePassword, CreateCategories, CreateCategoriesPayload, FetchCategoriesPayload } from "@/types/apis/settings.types";


export const settingsServices = {
     companyProfileUpdate: async (payload: Company) => {
        const formData = new FormData();
        formData.append('_method', 'PUT')
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
        );
    
        return response.data;
    },
    
    changePassword: async (payload: ChangePassword) => {
        const formData = new FormData();
        formData.append("old_password", payload.old_password);
        formData.append("new_password", payload.new_password);

        const response = await apiClient.post<ApiResponse<null>>(
            ENDPOINTS.CHANGEPASSWORD,
            formData
        );

        return response.data
    },

    newCategory: async (payload: CreateCategories) => {
        const formData = new FormData();
        formData.append("name", payload.name)

        const response = await apiClient.post<ApiResponse<CreateCategoriesPayload>>(
            ENDPOINTS.CREATECATEGORIES,
            formData
        );

        return response.data
    },

    fetchNewCategories: async () => {
        const response = await apiClient.get<ApiResponse<FetchCategoriesPayload>>(
            ENDPOINTS.CREATECATEGORIES
        );

        return response.data;
    }
}