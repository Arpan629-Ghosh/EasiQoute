import { invoiceServices } from "@/apis/services/invoice.services"
import { useQuery } from "@tanstack/react-query"


export const useInvoiceDetails = (invoiceId: number) => {
    const invoiceDetails = useQuery({
        queryKey: ['invoiceDetails', invoiceId],

        queryFn: async () => {
            const response = await invoiceServices.getInvoiceDetails(invoiceId);

            return {
                data: response.payload ?? null
            }
        },

        enabled: !!invoiceId
    })

    return {
        invoiceDetails: invoiceDetails.data?.data || null,
        isPending: invoiceDetails.isPending,
        isFetching: invoiceDetails.isFetching,
    }
}