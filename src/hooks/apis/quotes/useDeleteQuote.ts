import { quoteServices } from '@/apis/services/quote.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useDeleteQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: number) => quoteServices.deleteQuote(quoteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};
