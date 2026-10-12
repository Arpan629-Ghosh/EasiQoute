
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetClients } from '@/types/apis/client.types';
import { clientServices } from '@/apis/services/client.services';
export const useClientList = (
  filters: Omit<GetClients, 'page'> = {},
) => {
  const clientList = useInfiniteQuery({
    queryKey: ['clients', filters],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await clientServices.getClients({
        ...filters,
        page: pageParam,
      });

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

  const clientListData =
    clientList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage = clientList.data?.pages[clientList.data.pages.length - 1];

  return {
    clientListData,

    clientListsMeta: latestPage?.meta,
    clientListsLinks: latestPage?.links,

    isPending: clientList.isPending,
    isFetching: clientList.isFetching,
    isFetchingNextPage: clientList.isFetchingNextPage,

    hasNextPage: clientList.hasNextPage,

    fetchNextPage: clientList.fetchNextPage,

    refetch: clientList.refetch,

    isError: clientList.isError,
    clientListsError: clientList.error,
  };
};
