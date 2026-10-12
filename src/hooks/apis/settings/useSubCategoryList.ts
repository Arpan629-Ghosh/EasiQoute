import { useInfiniteQuery } from '@tanstack/react-query';
import { settingsServices } from '@/apis/services/settings.services';

export const useSubCategoryList = () => {
  const subCategoryList = useInfiniteQuery({
    queryKey: ['subcategories'],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await settingsServices.fetchNewSubCategories(pageParam);

      return {
        data: response.payload.data ?? [],
        meta: response.payload.meta,
        links: response.payload.links,
      };
    },

    getNextPageParam: lastPage => {
      const currentPage = lastPage.meta.current_page;
      const lastPageNumber = lastPage.meta.last_page;
      return currentPage < lastPageNumber ? currentPage + 1 : undefined;
    },
  });

  const subCategoryListData =
    subCategoryList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage =
    subCategoryList.data?.pages[subCategoryList.data.pages.length - 1];

  return {
    subCategoryListData,
    subCategoryListsMeta: latestPage?.meta,
    subCategoryListsLinks: latestPage?.links,
    isPending: subCategoryList.isPending,
    isFetching: subCategoryList.isFetching,
    isFetchingNextPage: subCategoryList.isFetchingNextPage,
    hasNextPage: subCategoryList.hasNextPage,
    fetchNextPage: subCategoryList.fetchNextPage,
    refetch: subCategoryList.refetch,
    isError: subCategoryList.isError,
    subCategoryListsError: subCategoryList.error,
  };
};
