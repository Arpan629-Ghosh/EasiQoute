import { settingsServices } from "@/apis/services/settings.services";
import { CreateSubCategories } from "@/types/apis/settings.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSubCategory = () => {

  const queryClient = useQueryClient();
  const deleteSubCategoryMutation = useMutation({
    mutationFn: async (payload: CreateSubCategories) => {
      return await settingsServices.deleteSubCategory(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['subcategories'],
      });
    },
  });

  return {
    deleteSubCategory: deleteSubCategoryMutation.mutate,
    deleteSubCategoryAsync: deleteSubCategoryMutation.mutateAsync,
    isDeletingSubCategory: deleteSubCategoryMutation.isPending,
    isDeleteSubCategoryError: deleteSubCategoryMutation.isError,
    deleteSubCategoryError: deleteSubCategoryMutation.error,
  };
};
