import { useInfiniteQuery } from '@tanstack/react-query';
import { settingsServices } from '@/apis/services/settings.services';

export const useItemList = () => {
  const itemList = useInfiniteQuery({
    queryKey: ['items-list'],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await settingsServices.fetchItems(pageParam);

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

  const itemListData =
    itemList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage =
    itemList.data?.pages[itemList.data.pages.length - 1];

  return {
    itemListData,
    itemListsMeta: latestPage?.meta,
    itemListsLinks: latestPage?.links,
    isPending: itemList.isPending,
    isFetching: itemList.isFetching,
    isFetchingNextPage: itemList.isFetchingNextPage,
    hasNextPage: itemList.hasNextPage,
    fetchNextPage: itemList.fetchNextPage,
    refetch: itemList.refetch,
    isError: itemList.isError,
    itemListsError: itemList.error,
  };
};
