import { useQuery } from '@tanstack/react-query';
import { quoteServices } from '@/apis/services/quote.services';
export const useGetSelectedSection = (quoteId: number) => {
    
    const getSelectedSections = useQuery({
        queryKey: ['selectedSections', quoteId],

        queryFn: async () => {
            const response = await quoteServices.getSelectedSections(quoteId);
            return response.payload ?? []
        },

        enabled: !!quoteId
    })

    return {
        selectedSections: getSelectedSections.data?.data || [],
        isPending: getSelectedSections.isPending
    }
};
