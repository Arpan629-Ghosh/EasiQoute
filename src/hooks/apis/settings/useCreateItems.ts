import { settingsServices } from '@/apis/services/settings.services';
import { CreateItems } from '@/types/apis/settings.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateItems = () => {
  const queryClient = useQueryClient();
  const createItemMutation = useMutation({
    mutationFn: (payload: CreateItems) => settingsServices.createItems(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['items-list'],
      });
    },
  });

  return {
    createItem: createItemMutation.mutate,
    createItemAsync: createItemMutation.mutateAsync,
    isCreatingItem: createItemMutation.isPending,
    isCreateItemError: createItemMutation.isError,
    createItemError: createItemMutation.error,
  };
};
