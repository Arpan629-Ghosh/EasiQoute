import { apiClient } from '@/apis/axiosInstance';
import { ApiResponse } from '@/types/apis/common.types';
import {
  CreateQuote,
  CreateQuotePayload,
  GetSections,
  QuoteSection,
  QuoteSectionData,
  QuoteSectionPayload,
  QuotesPayload,
  Sections,
  SectionsPayload,
  UpdateQuotePayload,
  UpdateStatus,
} from '@/types/apis/quote.types';
import { ENDPOINTS } from '../endPoints';
import { UpdateInvoiceStatus } from '@/types/apis/invoice.types';
import { FetchItemsData } from '@/types/apis/settings.types';

export const quoteServices = {
  quoteList: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<QuotesPayload>>(
      ENDPOINTS.QUOTELIST,
      {
        params: { page: payload },
      },
    );

    return response.data;
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

    formData.append(
      'is_company_phone_number_show',
      payload.is_company_phone_number_show ? '1' : '0',
    );

    const response = await apiClient.post<ApiResponse<CreateQuotePayload>>(
      ENDPOINTS.QUOTELIST,
      formData,
    );

    return response.data;
  },

  fetchQuoteDetails: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<CreateQuotePayload>>(
      `${ENDPOINTS.QUOTELIST}/${payload}`,
    );
    return response.data;
  },

  createSection: async (payload: Sections) => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('sort', payload.sort);

    if (payload.id) {
      formData.append('id', payload.id);
    }

    const response = await apiClient.post<ApiResponse<SectionsPayload>>(
      ENDPOINTS.SECTIONS,
      formData,
    );

    return response.data;
  },

  getSections: async () => {
    const response = await apiClient.get<ApiResponse<GetSections>>(
      ENDPOINTS.SECTIONS,
    );

    return response.data;
  },

  deleteSection: async (payload: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.SECTIONS}/${payload}`,
    );

    return response.data;
  },

  updateQuote: async (payload: UpdateQuotePayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    // formData.append('quote_id', payload.quote_id);
    formData.append(
      'is_company_phone_number_show',
      payload.is_company_phone_number_show ? '1' : '0',
    );
    if (payload.quote_summury?.client_id)
      formData.append('client_id', payload.quote_summury?.client_id);
    if (payload.quote_summury?.title)
      formData.append('title', payload.quote_summury.title);
    if (payload.quote_summury?.quote_date)
      formData.append('quote_date', payload.quote_summury.quote_date);
    if (payload.quote_summury?.expiry_date)
      formData.append('due_date', payload.quote_summury.expiry_date);
    if (payload.quote_summury?.description)
      formData.append('description', payload.quote_summury.description);
    if (payload.quote_summury?.notes)
      formData.append('notes', payload.quote_summury.notes);
    payload.quote_summury?.attachments?.forEach(file => {
      formData.append('attachments', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });

    if (payload.discount) formData.append('discount', payload.discount);
    if (payload.quote_items) {
      payload.quote_items.map((item, index) => {
        for (const key of Object.keys(item)) {
          formData.append(
            `items[${index}][${key}]`,
            item[key as keyof FetchItemsData],
          );
        }
      });
    }

    console.log('formData: ', formData);

    const response = await apiClient.post<ApiResponse<CreateQuotePayload>>(
      `${ENDPOINTS.QUOTELIST}/${payload.quote_id}`,
      formData,
    );

    return response.data;
  },

  updateStatus: async (payload: UpdateStatus | UpdateInvoiceStatus) => {
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
    const response = await apiClient.post<ApiResponse<QuoteSectionPayload[]>>(
      `${ENDPOINTS.QUOTELIST}/${payload.quote_id}/sections`,
      { sections: payload.sections },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
  getSelectedSections: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<QuoteSectionData>>(
      ENDPOINTS.GETSECTIONS,
      {
        params: {
          quote_id: payload,
        },
      },
    );

    return response.data;
  },

  duplicateQuote: async (payload: number) => {
    const response = await apiClient.post<ApiResponse<CreateQuote>>(
      `${ENDPOINTS.QUOTELIST}/${payload}/duplicate`,
    );

    return response.data;
  },

  deleteQuote: async (payload: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.QUOTELIST}/${payload}`,
    );

    return response.data;
  },
};
