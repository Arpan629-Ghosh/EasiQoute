import { homeService } from "@/apis/services/home.services";
import { useQuery } from "@tanstack/react-query";



export const useHomeScreenData = () => {
  const homeScreenData = useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const response = await homeService.homeScreenData();
      return {
        data: response.payload ?? null,
      }
    }
  });

  return {
    homeScreenData: homeScreenData.data?.data,
    isPending: homeScreenData.isPending,
    isError: homeScreenData.isError
  }
}