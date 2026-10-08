import { quoteServices } from '@/apis/services/quote.services';
import { UpdateInvoiceStatus } from '@/types/apis/invoice.types';
import { UpdateStatus } from '@/types/apis/quote.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateQuoteStatus = () => {
    const queryClient = useQueryClient();
    
    const updateQuoteStatusMutate = useMutation({
      mutationFn: (payload: UpdateStatus | UpdateInvoiceStatus) =>
        quoteServices.updateStatus(payload),

      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['quoteDetails'] }),
          queryClient.invalidateQueries({ queryKey: ['quotes'] }),
        ]);
      },
    });

    return {
      updateQuoteStatusAsync: updateQuoteStatusMutate.mutateAsync,
      isUpdatingQuote: updateQuoteStatusMutate.isPending,
    };
};
