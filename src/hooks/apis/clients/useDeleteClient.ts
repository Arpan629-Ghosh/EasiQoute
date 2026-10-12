import { clientServices } from '@/apis/services/client.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientId: number) => clientServices.deleteClient(clientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
