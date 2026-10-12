import { settingsServices } from "@/apis/services/settings.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    const deleteItemMutation = useMutation({
        mutationFn: async (itemId: number) => {
            return await settingsServices.deleteItem(itemId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['items-list'],
            });
        }
    });

    return {
        deleteItem: deleteItemMutation.mutate,
        deleteItemAsync: deleteItemMutation.mutateAsync,
        isDeletingItem: deleteItemMutation.isPending,
        isDeleteItemError: deleteItemMutation.isError,
        deleteItemError: deleteItemMutation.error
    }
}