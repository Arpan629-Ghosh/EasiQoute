import { CreatePaymentPayload, PaymenDetailsPayload, PaymentPayload, PaymentQueryParams } from "@/types/apis/payments.types";
import { apiClient } from "../axiosInstance";
import { ApiResponse } from "@/types/apis/common.types";
import { ENDPOINTS } from "../endPoints";
import { RecordPaymentProps } from "@/screens/paymentScreens/recordPaymentScreen/RecordPaymentScreen";



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
    },

    createPayment: async (payload: RecordPaymentProps) => {

        const formData = new FormData();
        if(payload.invoiceId)
            formData.append("invoice_id", payload.invoiceId);
        formData.append('amount_type', payload.amtType);
        formData.append('payment_method', payload.method);
        formData.append('amount', payload.amt);
        formData.append('currency', 'GBP');
        formData.append('payment_date', payload.date);

        if(payload.clientId) formData.append("client_id", payload.clientId)
        const response = await apiClient.post<ApiResponse<CreatePaymentPayload>>(
            ENDPOINTS.PAYMENT, formData
        )

        return response.data
    }
}