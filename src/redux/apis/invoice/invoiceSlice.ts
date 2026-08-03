import { createSlice } from "@reduxjs/toolkit";
import { createInvoiceThunk, getInvoiceDetailsThunk, getInvoicesThunk, updateInvoiceThunk } from "./invoiceThunk";
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
          .addCase(createInvoiceThunk.fulfilled, state => {
            state.loadingCreateInvoice = false;
            state.error = null;
            state.isFetchCall = true;
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
          .addCase(updateInvoiceThunk.fulfilled, state => {
            state.loadingInvoiceUpdate = false;
            state.error = null;
          })
          .addCase(updateInvoiceThunk.rejected, (state, action) => {
            state.loadingInvoiceUpdate = false;
            state.error = action.payload as string
      })
    }
})

export default invoiceSlice.reducer