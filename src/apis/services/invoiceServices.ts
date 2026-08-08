import { apiClient } from '@/apis/axiosInstance';
import { ApiResponse } from '@/types/apis/common.types';
import {
  InvoiceCreate,
  InvoiceDetailsPayload,
  InvoiceListPayload,
  InvoicePayload,
  UpdateInvoicePayload,
} from '@/types/apis/invoice.types';
import { ENDPOINTS } from '../endPoints';
import { FetchItemsData } from '@/types/apis/settings.types';

export const invoiceServices = {
  createInvoice: async (payload: InvoiceCreate) => {
    const formData = new FormData();
    formData.append('quote_id', payload.quote_id);
    formData.append('invoice_date', payload.invoice_date);
    formData.append('due_date', payload.due_date);
    formData.append('message', payload.message);
    formData.append('notes', payload.notes);
    formData.append(
      'is_company_phone_number_show',
      payload.is_company_phone_number_show ? '1' : '0',
    );
    payload.attachments?.forEach(file => {
      formData.append('attachments', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });

    const response = await apiClient.post<ApiResponse<InvoicePayload>>(
      ENDPOINTS.CREATEINVOICE,
      formData,
    );

    return response.data;
  },
  getInvoices: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<InvoiceListPayload>>(
      ENDPOINTS.CREATEINVOICE,
      {
        params: { page: payload },
      },
    );

    return response.data;
  },

  updateInvoice: async (payload: UpdateInvoicePayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('invoice_id', payload.invoice_id);
    formData.append(
      'is_company_phone_number_show',
      payload.invoice_summury?.is_company_phone_number_show ? '1' : '0',
    );
    if (payload.invoice_summury?.invoice_date)
      formData.append('invoice_date', payload.invoice_summury?.invoice_date);
    if (payload.invoice_summury?.due_date)
      formData.append('due_date', payload.invoice_summury?.due_date);
    if (payload.invoice_summury?.message)
      formData.append('message', payload.invoice_summury?.message);
    if (payload.invoice_summury?.notes)
      formData.append('notes', payload.invoice_summury?.notes);
    payload.invoice_summury?.attachments?.forEach(file => {
      formData.append('attachments', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });

    if (payload.discount) formData.append('discount', payload.discount);
    if (payload.invoice_items) {
      payload.invoice_items.map((item, index) => {
        for (const key of Object.keys(item)) {
          formData.append(
            `items[${index}][${key}]`,
            item[key as keyof FetchItemsData],
          );
        }
      });
    }

    console.log('formData: ', formData);

    const response = await apiClient.post<ApiResponse<InvoicePayload>>(
      `${ENDPOINTS.CREATEINVOICE}/${payload.invoice_id}`,
      formData,
    );

    return response.data;
  },

  getInvoiceDetails: async (payload: number) => {
    const response = await apiClient.get<ApiResponse<InvoiceDetailsPayload>>(
      `${ENDPOINTS.CREATEINVOICE}/${payload}`,
    );

    return response.data;
  },

  deleteInvoice: async (payload: number) => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `${ENDPOINTS.CREATEINVOICE}/${payload}`,
    );

    return response.data;
  },
};
