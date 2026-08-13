import { paymentServices } from '@/apis/services/payment.services';
import { PaymentQueryParams } from '@/types/apis/payments.types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const usePayments = (params?: PaymentQueryParams) => {
  const paymentListing = useInfiniteQuery({
    queryKey: ['payments', params],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await paymentServices.getPaymentList({
        ...params,
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

      if (currentPage < lastPageNumber) {
        return currentPage + 1;
      }

      return undefined;
    },
  });

  const paymentLists =
    paymentListing.data?.pages.flatMap(page => page.data) ?? [];

  const latestPage =
    paymentListing.data?.pages[paymentListing.data.pages.length - 1];
  
    
    

  return {
    paymentLists,

    paymentListsMeta: latestPage?.meta,
    paymentListsLinks: latestPage?.links,

    isPending: paymentListing.isPending,
    isFetching: paymentListing.isFetching,
    isFetchingNextPage: paymentListing.isFetchingNextPage,

    hasNextPage: paymentListing.hasNextPage,

    fetchNextPage: paymentListing.fetchNextPage,

    refetch: paymentListing.refetch,

    isError: paymentListing.isError,
    paymentListsError: paymentListing.error,

   
  };
};
