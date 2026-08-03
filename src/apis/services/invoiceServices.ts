import { apiClient } from "@/config/apis/client";
import { ApiResponse } from "@/types/apis/common.types";
import { InvoiceCreate, InvoiceDetailsPayload, InvoiceListPayload, InvoicePayload, UpdateInvoicePayload } from "@/types/apis/invoice.types";
import { ENDPOINTS } from "../endPoints";


export const invoiceServices = {
    createInvoice: async (payload: InvoiceCreate) => {
        const formData = new FormData();
        formData.append("quote_id", payload.quote_id);
        formData.append("invoice_date", payload.invoice_date);
        formData.append("due_date", payload.due_date);
        formData.append("message", payload.message);
        payload.attachments?.forEach(file => {
          formData.append('attachments', {
            uri: file.uri,
            name: file.name,
            type: file.type,
          });
        });

        const response = await apiClient.post<ApiResponse<InvoicePayload>>(
            ENDPOINTS.CREATEINVOICE, formData
        )

        return response.data
    },
    getInvoices: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<InvoiceListPayload>>(
          ENDPOINTS.CREATEINVOICE,
          {
            params: { page: payload },
          },
        );

        return response.data
  },
    
  updateInvoice: async (payload: UpdateInvoicePayload) => {
    const formData = new FormData();

    formData.append("_method", 'PUT');
    formData.append("invoice_date", payload.invoice_summury?.invoice_date);
    formData.append("due_date", payload.invoice_summury?.due_date);
    formData.append("message", payload.invoice_summury?.message);
    formData.append("discount", payload.discount);
    payload.invoice_summury?.attachments?.forEach(file => {
      formData.append('attachments', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });

    formData.append("items", payload.invoice_items);


    const response = await apiClient.put<ApiResponse<InvoicePayload>>(
      `${ENDPOINTS.CREATEINVOICE}/${payload.invoice_id}`, formData
    )

    return response.data;
  },
  

    getInvoiceDetails: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<InvoiceDetailsPayload>>(
            `${ENDPOINTS.CREATEINVOICE}/${payload}`,
        );

        return response.data;
    }
}