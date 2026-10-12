import { clientServices } from "@/apis/services/client.services";
import { useQuery } from "@tanstack/react-query"


export const useClientDetails = (clientId: number) => {
    const clientDetails = useQuery({
        queryKey: ['clientDetails', clientId],

        queryFn: async () => {
            const response = await clientServices.showClientDetails(clientId);

            return {
                data: response.payload ?? null
            }
        },

        enabled: !!clientId
    })

    return {
        clientDetails: clientDetails.data?.data || null,
        isPending: clientDetails.isPending,
        isFetching: clientDetails.isFetching,
    }
}