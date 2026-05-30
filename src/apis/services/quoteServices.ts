import { apiClient } from "@/config/apis/client"
import { ApiResponse } from "@/types/apis/common.types"
import { CreateQuote, CreateQuotePayload, GetSections, QuoteSection, QuoteSectionData, QuoteSectionPayload, QuotesPayload, Sections, SectionsPayload, UpdateQuote, UpdateStatus } from "@/types/apis/quote.types"
import { ENDPOINTS } from "../endPoints"


export const quoteServices = {
    quoteList: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<QuotesPayload>>(ENDPOINTS.QUOTELIST, {
            params: { page: payload }
        })

        return response.data
    },

    createQuote: async (payload: CreateQuote) => {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('description', payload.description);
        formData.append('quote_date', payload.quote_date);
        formData.append('expiry_date', payload.expiry_date);
        formData.append('client_id', payload.client_id);
        // formData.append('attachments', []);
        formData.append('notes', payload.notes);
        payload.attachments?.forEach(file => {
          formData.append('attachments[]', {
            uri: file.uri,
            name: file.name,
            type: file.type,
          });
        });

        const response = await apiClient.post<ApiResponse<CreateQuotePayload>>(ENDPOINTS.QUOTELIST, formData)

        return response.data;
    },

    fetchQuoteDetails: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<CreateQuotePayload>>(
            `${ENDPOINTS.QUOTELIST}/${payload}`
        )
        return response.data;
    },

    createSection: async (payload: Sections) => {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('content', payload.content);
        formData.append('sort', payload.sort)

        if (payload.id) {
            formData.append('id', payload.id)
        }

        const response = await apiClient.post<ApiResponse<SectionsPayload>>(
            ENDPOINTS.SECTIONS,
            formData
        )

        return response.data;
    },

    getSections: async () => {
        const response = await apiClient.get<ApiResponse<GetSections>>(
            ENDPOINTS.SECTIONS
        );

        return response.data;
    },

    deleteSection: async (payload: number) => {
        const response = await apiClient.delete<ApiResponse<null>>(
            `${ENDPOINTS.SECTIONS}/${payload}`
        );

        return response.data;
    },

    updateQuote: async (payload: UpdateQuote) => {
        const response = await apiClient.put<ApiResponse<CreateQuotePayload>>(
          `${ENDPOINTS.QUOTELIST}/${payload.quoteId}`,
            {items: payload.items},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        return response.data;
    },

    updateStatus: async (payload: UpdateStatus) => {
        const response = await apiClient.patch<ApiResponse<null>>(
          ENDPOINTS.UPDATESTATUS,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        return response.data;
    },

    createSelectedSection: async (payload: QuoteSection) => {
        const response = await apiClient.post<
          ApiResponse<QuoteSectionPayload[]>
        >(
          `${ENDPOINTS.QUOTELIST}/${payload.quote_id}/sections`,
          { sections: payload.sections },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        return response.data
    },
    getSelectedSections: async (payload: number) => {
        const response = await apiClient.get<
          ApiResponse<QuoteSectionData>
        >(ENDPOINTS.GETSECTIONS, {
          params: {
            quote_id: payload,
          },
        });

        return response.data
    }
}