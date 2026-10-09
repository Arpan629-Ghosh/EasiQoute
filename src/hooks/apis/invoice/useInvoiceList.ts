import { useInfiniteQuery } from '@tanstack/react-query';
import { invoiceServices } from '@/apis/services/invoice.services';
import { GetInvoiceParams } from '@/types/apis/invoice.types';
export const useInvoiceList = (
  filters: Omit<GetInvoiceParams, 'page'> = {},
) => {
  const invoiceList =  useInfiniteQuery({
    queryKey: ['invoices', filters],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) =>{
        const response = await invoiceServices.getInvoices({ ...filters, page: pageParam })
        
        return {
            data: response.payload.data ?? [],
            meta: response.payload.meta,
            links: response.payload.links
        }
      },

    getNextPageParam: lastPage => {
        const currentPage = lastPage.meta.current_page;
        const lastPageNumber = lastPage.meta.last_page;
      return currentPage < lastPageNumber ? currentPage + 1 : undefined;
    },
  });
    
  const invoiceListData = invoiceList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage = invoiceList.data?.pages[invoiceList.data.pages.length - 1];
    
    return {
        invoiceListData,

        invoiceListsMeta: latestPage?.meta,
        invoiceListsLinks: latestPage?.links,

        isPending: invoiceList.isPending,
        isFetching: invoiceList.isFetching,
        isFetchingNextPage: invoiceList.isFetchingNextPage,

        hasNextPage: invoiceList.hasNextPage,

        fetchNextPage: invoiceList.fetchNextPage,

        refetch: invoiceList.refetch,

        isError: invoiceList.isError,
        invoiceListsError: invoiceList.error,
    }
};
