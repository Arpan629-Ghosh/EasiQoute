import { useMutation, useQueryClient } from '@tanstack/react-query';
import { quoteServices } from '@/apis/services/quote.services';
export const useDeleteSections = (quoteId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: number) => quoteServices.deleteSection(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['selectedSections', quoteId],
      });
    },
  });
};
