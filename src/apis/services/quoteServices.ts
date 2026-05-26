import { apiClient } from "@/config/apis/client"
import { ApiResponse } from "@/types/apis/common.types"
import { CreateQuote, CreateQuotePayload, QuotesPayload } from "@/types/apis/quote.types"
import { ENDPOINTS } from "../endPoints"


export const quoteServices = {
    quoteList: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<QuotesPayload>>(ENDPOINTS.QUOTELIST, {
            params: {page: payload}
        })

        return response.data
    },

    createQuote: async (payload: CreateQuote) => {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('description', payload.description);
        formData.append('quote_date', payload.quote_date);
        formData.append('expiry_date', payload.expiry_date);
        formData.append('client_id', payload.client_id);
        // formData.append('attachments', []);
        formData.append('notes', payload.notes);

        const response = await apiClient.post<ApiResponse<CreateQuotePayload>>(ENDPOINTS.QUOTELIST, formData)

        return response.data;
    },

    fetchQuoteDetails: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<CreateQuotePayload>>(
            `${ENDPOINTS.QUOTELIST}/${payload}`
        )
        return response.data;
    }
}