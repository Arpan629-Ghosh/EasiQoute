import { QuoteSection, UpdateQuotePayload, UpdateStatus } from './../../../types/apis/quote.types';
import { quoteServices } from "@/apis/services/quoteServices";
import { UpdateInvoiceStatus } from '@/types/apis/invoice.types';
import { CreateQuote, Sections } from "@/types/apis/quote.types";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const quoteListThunk = createAsyncThunk('/api/quotes', 
    async (payload: number, thunkAPI) => {
        try {
            const response = await quoteServices.quoteList(payload);
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const createQuoteThunk = createAsyncThunk('/api/quotes/create', 
    async (payload: CreateQuote, thunkAPI) => {
        try {
            const response = await quoteServices.createQuote(payload);
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const fetchQuoteDetailsThunk = createAsyncThunk('/api/quotes/details',

    async (payload: number, thunkAPI) => {
        try {
            const response = await quoteServices.fetchQuoteDetails(payload)
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createSectionsThunk = createAsyncThunk('/api/proposal-document/sections',

    async (payload: Sections, thunkAPI) => {
        try {
            const response = await quoteServices.createSection(payload)

            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }

            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const getSectionsThunk = createAsyncThunk('/api/proposal-document/sections/get', 

    async (_: void, thunkAPI) => {
        try {
            const response = await quoteServices.getSections()

            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const deleteSectionsThunk = createAsyncThunk(
    '/api/proposal-document/sections/delete',
    
    async (payload: number, thunkAPI) => {
        try {
            const response = await quoteServices.deleteSection(payload)
            if (!response.result) {
              return thunkAPI.rejectWithValue(response.message);
            }
            return response.message;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateQuoteThunk = createAsyncThunk('api/quotes/update',

    async (payload: UpdateQuotePayload, thunkAPI) => {
        try {
            const response = await quoteServices.updateQuote(payload)
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateStatusThunk = createAsyncThunk('api/update-status',

    async (payload: UpdateStatus | UpdateInvoiceStatus, thunkAPI) => {
        try {
            const response = await quoteServices.updateStatus(payload);
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }
           
            return response.message;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createSelectedSectionsThunk = createAsyncThunk('api/quotes/section',

    async (payload: QuoteSection, thunkAPI) => {
        try {
            const response = await quoteServices.createSelectedSection(payload);
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getSelectedSectionsThunk = createAsyncThunk(
  '/api/proposal-document/sections/fetch',

  async (payload: number, thunkAPI) => {
    try {
      const response = await quoteServices.getSelectedSections(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const duplicateQuoteThunk = createAsyncThunk(
    '/api/quote/duplicate',

    async (payload: number, thunkAPI) => {
        try {
            const response = await quoteServices.duplicateQuote(payload);

            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const deleteQuoteThunk = createAsyncThunk(
    '/api/quote/delete',

    async (payload: number, thunkAPI) => {
        try {
            const response = await quoteServices.deleteQuote(payload);

            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message);
            }

            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)