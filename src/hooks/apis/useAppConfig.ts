import { settingsServices } from "@/apis/services/settings.services"
import { useQuery } from "@tanstack/react-query"

export const useAppConfig = () => {
    const appConfig = useQuery({
        queryKey: ["appConfig"],
        queryFn: async () => {
            const response = await settingsServices.getAppConfig();
            return {
                data: response.payload ?? null
            }
        }
    })

    return {
        appConfigData: appConfig.data?.data
    }
}