import { invoiceServices } from '@/apis/services/invoice.services';
import { InvoiceCreate, UpdateInvoicePayload } from '@/types/apis/invoice.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createInvoiceThunk = createAsyncThunk(
  '/api/invoices',
  async (payload: InvoiceCreate, thunkAPI) => {
    try {
      const response = await invoiceServices.createInvoice(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getInvoicesThunk = createAsyncThunk(
  '/get/invoices',
  async (payload: number, thunkAPI) => {
    try {
      const response = await invoiceServices.getInvoices(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getInvoiceDetailsThunk = createAsyncThunk(
  'get/invoice-details',
  async (payload: number, thunkAPI) => {
    try {
      const response = await invoiceServices.getInvoiceDetails(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateInvoiceThunk = createAsyncThunk(
  'update/invoice',

  async (payload: UpdateInvoicePayload, thunkAPI) => {

    console.log('payloadUI: ', payload);
    try {
      const response = await invoiceServices.updateInvoice(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteInvoiceThunk = createAsyncThunk(
  '/api/invoice/delete',

  async (payload: number, thunkAPI) => {
    try {
      const response = await invoiceServices.deleteInvoice(payload);

      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }

      return response.payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)
