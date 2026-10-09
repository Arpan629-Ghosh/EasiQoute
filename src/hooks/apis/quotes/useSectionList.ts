import { quoteServices } from "@/apis/services/quote.services"
import { useQuery } from "@tanstack/react-query"


export const useSectionList = () => {
    const sectionList = useQuery({
        queryKey: ["sections"],

        queryFn: async () => {
            const response = await quoteServices.getSections();
            return response.payload ?? [];
        }
    })

    return {
        sectionList: sectionList.data?.data || [],
        isPending: sectionList.isPending,
        isFetching: sectionList.isFetching
    }
}