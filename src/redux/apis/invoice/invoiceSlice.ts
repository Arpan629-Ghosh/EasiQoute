import { createSlice } from "@reduxjs/toolkit";
import { createInvoiceThunk, deleteInvoiceThunk, getInvoiceDetailsThunk, getInvoicesThunk, updateInvoiceThunk } from "./invoiceThunk";
import { InvoiceDetailsPayload, InvoiceListItem } from "@/types/apis/invoice.types";


export interface InvoiceState {
  invoiceList: InvoiceListItem[];
  invoiceDetails: InvoiceDetailsPayload | null;
  current_page: number;
  last_page: number;
  loadingInvoiceUpdate: boolean;
  loadingInvoiceDetails: boolean;
  loadingGetInvoice: boolean;
  loadingCreateInvoice: boolean;
  loadingDeleteInvoice: boolean;
  error: string | null;
  isFetchCall: boolean;
}

const initialState: InvoiceState = {
  invoiceList: [],
  invoiceDetails: null,
  current_page: 1,
  last_page: 1,
  loadingInvoiceUpdate: false,
  loadingInvoiceDetails: false,
  loadingGetInvoice: false,
  loadingCreateInvoice: false,
  loadingDeleteInvoice: false,
  error: null,
  isFetchCall: false,
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
          .addCase(createInvoiceThunk.pending, state => {
            state.loadingCreateInvoice = true;
            state.error = null;
          })
          .addCase(createInvoiceThunk.fulfilled, (state, action) => {
            state.loadingCreateInvoice = false;
            state.error = null;
            const invoice: InvoiceListItem = {
              id: action.payload.id,
              type: 'invoice',
              title: action.payload.title,
              name: action.payload.client.company_name,
              reference_number: action.payload.invoice_number,
              quote_reference_number: action.payload.quote.reference_number,
              status: action.payload.status,
              is_editable: action.payload.is_editable,
              price: action.payload.financial_summary.grand_total,
              total_due: 0,
              expiry_date: action.payload.due_date,
              created_at: action.payload.invoice_date,
              deposit_required: action.payload.deposit_required,
              deposit_type: action.payload.deposit_type,
              deposit_amount: action.payload.deposit_amount,
              deposit_available: action.payload.deposit_available,
            };
            state.invoiceList.unshift(invoice)
          })
          .addCase(createInvoiceThunk.rejected, (state, action) => {
            state.loadingCreateInvoice = false;
            state.error = action.payload as string;
          })
          .addCase(getInvoicesThunk.pending, state => {
            state.loadingGetInvoice = true;
            state.error = null;
          })
          .addCase(getInvoicesThunk.fulfilled, (state, action) => {
            
            state.loadingGetInvoice = false;
            state.error = null;

            const incomingData = action.payload.payload.data;
            const current_page = action.payload.payload.meta.last_page;

            if (current_page === 1) {
              state.invoiceList = incomingData;
            } else {
              const existingIds = new Set(state.invoiceList.map(item => item.id));

              const uniqueItems = incomingData.filter(
                item => !existingIds.has(item.id),
              );
              state.invoiceList.push(...uniqueItems);
            }
            state.isFetchCall = false;
            state.current_page = action.payload.payload.meta.current_page;
            state.last_page = action.payload.payload.meta.last_page;
          })
          .addCase(getInvoicesThunk.rejected, (state, action) => {
            state.loadingGetInvoice = false;
            state.error = action.payload as string;
          })
          .addCase(getInvoiceDetailsThunk.pending, state => {
            state.loadingInvoiceDetails = true;
            state.error = null;
          })
          .addCase(getInvoiceDetailsThunk.fulfilled, (state, action) => {
            state.loadingInvoiceDetails = false;
            state.invoiceDetails = action.payload;
            state.error = null;
          })
          .addCase(getInvoiceDetailsThunk.rejected, (state, action) => {
            state.loadingInvoiceDetails = false;
            state.error = action.payload as string;
          })
          .addCase(updateInvoiceThunk.pending, state => {
            state.loadingInvoiceUpdate = true;
            state.error = null;
          })
          .addCase(updateInvoiceThunk.fulfilled, (state, action) => {
            state.loadingInvoiceUpdate = false;
            state.invoiceDetails = action.payload;
            state.error = null;
          })
          .addCase(updateInvoiceThunk.rejected, (state, action) => {
            state.loadingInvoiceUpdate = false;
            state.error = action.payload as string
          })
          .addCase(deleteInvoiceThunk.pending, state => {
            state.loadingDeleteInvoice = true;
            state.error = null;
          })
          .addCase(deleteInvoiceThunk.fulfilled, (state, action) => {
            state.loadingDeleteInvoice = false;
            const invoiceId = action.meta.arg;
            state.invoiceList.filter((invoice) => invoice.id !== invoiceId)
            state.error = null;
          })
          .addCase(deleteInvoiceThunk.rejected, (state, action) => {
            state.loadingDeleteInvoice = true;
            state.error = action.payload as string;
      })
    }
})

export default invoiceSlice.reducer