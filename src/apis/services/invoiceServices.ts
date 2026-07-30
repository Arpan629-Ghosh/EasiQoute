import { apiClient } from "@/config/apis/client";
import { ApiResponse } from "@/types/apis/common.types";
import { InvoiceCreate, InvoiceDetailsPayload, InvoiceListPayload, InvoicePayload } from "@/types/apis/invoice.types";
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
    getInvoiceDetails: async (payload: number) => {
        const response = await apiClient.get<ApiResponse<InvoiceDetailsPayload>>(
            `${ENDPOINTS.CREATEINVOICE}/${payload}`,
        );

        return response.data;
    }
}