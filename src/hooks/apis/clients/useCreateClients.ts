import { clientServices } from "@/apis/services/client.services"
import { CreateClient } from "@/types/apis/client.types"
import { useMutation } from "@tanstack/react-query"


export const useCreateClients = () => {
    const createClientMutation = useMutation({
        mutationFn: async (payload: CreateClient) => {
            await clientServices.createClients(payload);
        }
    })

    return {
        createClientMutateAsync: createClientMutation.mutateAsync,
        isCreating: createClientMutation.isPending
    }
}