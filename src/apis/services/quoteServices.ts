import { apiClient } from "@/config/apis/client"
import { ApiResponse } from "@/types/apis/common.types"
import { QuotesPayload } from "@/types/apis/quote.types"
import { ENDPOINTS } from "../endPoints"


export const quoteServices = {
    quoteList: async () => {
        const response = await apiClient.get<ApiResponse<QuotesPayload>>(ENDPOINTS.QUOTELIST)

        return response.data
    }
}