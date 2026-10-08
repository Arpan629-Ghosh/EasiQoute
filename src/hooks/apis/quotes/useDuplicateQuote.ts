import { quoteServices } from '@/apis/services/quote.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useDuplicateQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: number) => quoteServices.duplicateQuote(quoteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};
