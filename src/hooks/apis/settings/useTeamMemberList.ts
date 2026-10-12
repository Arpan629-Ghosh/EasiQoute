import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchTeamMembersPayload } from '@/types/apis/settings.types';
import { settingsServices } from '@/apis/services/settings.services';
export const useTeamMemberList = (filters: Omit<FetchTeamMembersPayload, 'page'> = {}) => {
  const teamMemberList = useInfiniteQuery({
    queryKey: ['team-members', filters],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await settingsServices.fetchTeamMembers({
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

  const teamMemberListData =
    teamMemberList.data?.pages.flatMap(page => page.data) ?? [];
  const latestPage = teamMemberList.data?.pages[teamMemberList.data.pages.length - 1];

  return {
    teamMemberListData,

    teamMemberListsMeta: latestPage?.meta,
    teamMemberListsLinks: latestPage?.links,

    isPending: teamMemberList.isPending,
    isFetching: teamMemberList.isFetching,
    isFetchingNextPage: teamMemberList.isFetchingNextPage,

    hasNextPage: teamMemberList.hasNextPage,

    fetchNextPage: teamMemberList.fetchNextPage,

    refetch: teamMemberList.refetch,

    isError: teamMemberList.isError,
    teamMemberListsError: teamMemberList.error,
  };
};
