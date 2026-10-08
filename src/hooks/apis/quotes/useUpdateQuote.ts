import { quoteServices } from "@/apis/services/quote.services"
import { UpdateQuotePayload } from "@/types/apis/quote.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUpdateQuote = () => {

    const queryClient = useQueryClient();
    const updateQuoteMutation = useMutation({
      mutationFn: (payload: UpdateQuotePayload) =>
            quoteServices.updateQuote(payload),
        
    

        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['quoteDetails' ],
            });
        }

    
    });

    return {
        updateQuote: updateQuoteMutation.mutate,
        updateQuoteAsync: updateQuoteMutation.mutateAsync,
        isUpdatingQuote: updateQuoteMutation.isPending,
        isUpdateQuoteError: updateQuoteMutation.isError,
        updateQuoteError: updateQuoteMutation.error
    }
}