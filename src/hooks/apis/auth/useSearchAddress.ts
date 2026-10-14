import { useQuery } from '@tanstack/react-query';
import { authServices } from '@/apis/services/auth.services';

export const useSearchAddress = (search: string) => {
  const query = search.trim();

  return useQuery({
    queryKey: ['address', 'search', query],

    queryFn: async () => {
      const response = await authServices.searchAddress(query);

      if (!response.result) {
        throw new Error(response.message);
      }

      return response.payload;
    },

    enabled: query.length >= 3,
    staleTime: 30_000,
  });
};
