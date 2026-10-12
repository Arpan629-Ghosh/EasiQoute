import { settingsServices } from "@/apis/services/settings.services";
import { CreateSubCategories } from "@/types/apis/settings.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useCreateSubCategories = () => {

    const queryClient = useQueryClient();
    const createSubCategoryMutation = useMutation({
      mutationFn: (payload: CreateSubCategories) =>
            settingsServices.newSubCategory(payload),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['subcategories'],
            });
        }
    });

    return {
        createSubCategory: createSubCategoryMutation.mutate,
        createSubCategoryAsync: createSubCategoryMutation.mutateAsync,
        isCreatingSubCategory: createSubCategoryMutation.isPending,
        isCreateSubCategoryError: createSubCategoryMutation.isError,
        createSubCategoryError: createSubCategoryMutation.error
    } 
}