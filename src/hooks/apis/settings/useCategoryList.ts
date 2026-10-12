import { useInfiniteQuery } from '@tanstack/react-query';
import { settingsServices } from '@/apis/services/settings.services';

export const useCategoryList = () => {
  const categoryList = useInfiniteQuery({
    queryKey: ['categories'],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await settingsServices.fetchNewCategories(pageParam);

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

  const categoryListData =
  categoryList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage = categoryList.data?.pages[categoryList.data.pages.length - 1];

  return {
    categoryListData,
    categoryListsMeta: latestPage?.meta,
    categoryListsLinks: latestPage?.links,
    isPending: categoryList.isPending,
    isFetching: categoryList.isFetching,
    isFetchingNextPage: categoryList.isFetchingNextPage,
    hasNextPage: categoryList.hasNextPage,
    fetchNextPage: categoryList.fetchNextPage,
    refetch: categoryList.refetch,
    isError: categoryList.isError,
    categoryListsError: categoryList.error,
  };
};
