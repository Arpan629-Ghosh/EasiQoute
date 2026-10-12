import { clientServices } from '@/apis/services/client.services';
import { CreateClient } from '@/types/apis/client.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const updateClientMutation = useMutation({
    mutationFn: async (payload: CreateClient) => {
      return await clientServices.updateClient(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['clientDetails'],
      });
    },
  });

  return {
    updateClientMutate: updateClientMutation.mutateAsync,
    isUpdatingClient: updateClientMutation.isPending,
  };
};
