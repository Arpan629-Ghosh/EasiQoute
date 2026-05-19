import { apiClient } from "@/config/apis/client"
import { ApiResponse } from "@/types/apis/common.types"
import { ENDPOINTS } from "../endPoints"
import { HomeScreenResponse } from "@/types/apis/home.types"


export const homeService = {
    homeScreenData: async () => {
        const respnse = await apiClient.get<ApiResponse<HomeScreenResponse>>(ENDPOINTS.HOMESCREEN)

        return respnse.data
    }
}