import { apiClient } from "@/config/apis/client";
import { CreateClient, GetClientsPayload } from "@/types/apis/client.types";
import { ApiResponse } from "@/types/apis/common.types";
import { CreateCategoriesPayload } from "@/types/apis/settings.types";
import { ENDPOINTS } from "../endPoints";


export const clientServices = {
    createClients: async(payload: CreateClient) => {
        const formData = new FormData();
        formData.append("email", payload.email);
        formData.append("phone", payload.phone);
        formData.append("name", payload.name);
        formData.append("company_name", payload.company_name);
        formData.append("address", payload.address);
        formData.append("city", payload.city);
        formData.append("postcode", payload.postcode);
        formData.append("country", payload.country)

        const response = await apiClient.post<ApiResponse<CreateCategoriesPayload>>(
            ENDPOINTS.CRREATECLIENT,
            formData
        )

        return response.data
    },

    getClients: async (payload: string) => {
        const response = await apiClient.get<ApiResponse<GetClientsPayload>>(
            ENDPOINTS.CRREATECLIENT,
            {
                params: {
                    sort_by: payload
                }
            }
        )

        return response.data
    }
}