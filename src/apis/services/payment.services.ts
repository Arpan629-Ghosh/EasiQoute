import { PaymenDetailsPayload, PaymentPayload, PaymentQueryParams } from "@/types/apis/payments.types";
import { apiClient } from "../axiosInstance";
import { ApiResponse } from "@/types/apis/common.types";
import { ENDPOINTS } from "../endPoints";



export const paymentServices = {
    getPaymentList: async (payload?: PaymentQueryParams) => {
        const response = await apiClient.get<ApiResponse<PaymentPayload>>(
            ENDPOINTS.PAYMENT, {
                params: {
                    search: payload?.search,
                    page: payload?.page
                }
            }
        )

        return response.data
    },

    getPaymentDetails: async (id?: number) => {
        const response = await apiClient.get<ApiResponse<PaymenDetailsPayload>>(
            `${ENDPOINTS.PAYMENTDETAILS}/${id}`
        )

        return response.data;
    }
}