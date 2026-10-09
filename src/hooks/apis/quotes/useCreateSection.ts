import { quoteServices } from "@/apis/services/quote.services"
import { QuoteSection, Sections } from "@/types/apis/quote.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateSection = () => {

    const queryClient = useQueryClient();
    const createSectionMutation = useMutation({
        mutationFn: (payload: Sections) => quoteServices.createSection(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['sections'],
            });
        }
    })

    const createSelectedSectionMutation = useMutation({
        mutationFn: (payload: QuoteSection) => quoteServices.createSelectedSection(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['quoteDetails'],
            });
        }
    })

    return {
        createSectionMutateAsync: createSectionMutation.mutateAsync,
        isCreatingSection: createSectionMutation.isPending,

        createSelectedSectionMutation: createSelectedSectionMutation.mutateAsync,
        isCreatingSelectedSection: createSelectedSectionMutation.isPending
    }
}