import { quoteServices } from "@/apis/services/quote.services"
import { useQuery } from "@tanstack/react-query"


export const useQuoteDetails = (quoteId: number) => {
    const quoteDetails = useQuery({
        queryKey: ["quoteDetails", quoteId],

        queryFn: async () => {
            const response = await quoteServices.fetchQuoteDetails(quoteId);

            return {
                data: response.payload
            }
        },

        enabled: !!quoteId
    })

    return {
        quoteDetails: quoteDetails.data?.data,
        isPending: quoteDetails.isPending,
        isFetching: quoteDetails.isFetching,
        isError: quoteDetails.isError,
        quoteDetailsError: quoteDetails.error
    }
}