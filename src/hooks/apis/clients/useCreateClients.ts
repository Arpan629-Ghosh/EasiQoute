import { clientServices } from "@/apis/services/client.services"
import { CreateClient } from "@/types/apis/client.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateClients = () => {

    const queryClient = useQueryClient();
    const createClientMutation = useMutation({
        mutationFn: async (payload: CreateClient) => {
            return await clientServices.createClients(payload);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['clients']
            })
        }
    })

    return {
        createClientMutateAsync: createClientMutation.mutateAsync,
        isCreating: createClientMutation.isPending
    }
}