import { settingsServices } from "@/apis/services/settings.services";
import { CreateCategories } from "@/types/apis/settings.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = () => {

    const queryClient = useQueryClient();
    const createCategoryMutation = useMutation({
        mutationFn: (payload: CreateCategories) =>
            settingsServices.newCategory(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['categories'],
            });
        }
    });

    return {
        createCategory: createCategoryMutation.mutate,
        createCategoryAsync: createCategoryMutation.mutateAsync,
        isCreatingCategory: createCategoryMutation.isPending,
        isCreateCategoryError: createCategoryMutation.isError,
        createCategoryError: createCategoryMutation.error
    }
}
