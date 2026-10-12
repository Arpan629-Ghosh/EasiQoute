import { settingsServices } from "@/apis/services/settings.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteCategory = () => {

    const queryClient = useQueryClient();
    const deleteCategoryMutation = useMutation({
        mutationFn: async(categoryId: number) =>{
            return await settingsServices.deleteCategory(categoryId);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        }
    });

    return {
        deleteCategory: deleteCategoryMutation.mutate,
        deleteCategoryAsync: deleteCategoryMutation.mutateAsync,
        isDeletingCategory: deleteCategoryMutation.isPending,
        isDeleteCategoryError: deleteCategoryMutation.isError,
        deleteCategoryError: deleteCategoryMutation.error
    }
}