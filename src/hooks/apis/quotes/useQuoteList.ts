import { quoteServices } from '@/apis/services/quote.services';
import { CreateQuote } from '@/types/apis/quote.types';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const QUOTES_QUERY_KEY = ['quotes'];

export const useQuoteList = () => {

  const queryClient = useQueryClient();
  const quoteList = useInfiniteQuery({
    queryKey: QUOTES_QUERY_KEY,

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await quoteServices.quoteList(pageParam);

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

  const quoteListData = quoteList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage = quoteList.data?.pages[quoteList.data.pages.length - 1];

  const createQuoteMutation = useMutation({
    mutationFn: (payload: CreateQuote) => quoteServices.createQuote(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUOTES_QUERY_KEY,
      });
    }
  })

  return {
    quoteListData,

    quoteListsMeta: latestPage?.meta,
    quoteListsLinks: latestPage?.links,

    isPending: quoteList.isPending,
    isFetching: quoteList.isFetching,
    isFetchingNextPage: quoteList.isFetchingNextPage,

    hasNextPage: quoteList.hasNextPage,

    fetchNextPage: quoteList.fetchNextPage,

    refetch: quoteList.refetch,

    isError: quoteList.isError,
    quoteListsError: quoteList.error,

    createQuote: createQuoteMutation.mutate,
    createQuoteMutationAsync: createQuoteMutation.mutateAsync,
    isCreatingQuote: createQuoteMutation.isPending,
    createQuoteError: createQuoteMutation.error,
    isCreateQuoteError: createQuoteMutation.isError,
  };
};
