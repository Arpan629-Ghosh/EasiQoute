import { createSlice } from '@reduxjs/toolkit';
import {
  CreateQuotePayload,
  QuoteItem,
  SectionsPayload,
} from '@/types/apis/quote.types';
import {
  createQuoteThunk,
  createSectionsThunk,
  deleteSectionsThunk,
  fetchQuoteDetailsThunk,
  getSectionsThunk,
  quoteListThunk,
  updateQuoteThunk,
  updateStatusThunk,
} from './quotesThunk';

export interface QuotesState {
  quoteList: QuoteItem[];
  sections: SectionsPayload[];
  quoteDetails: CreateQuotePayload | null;
  current_page: number;
  last_page: number;
  loading: boolean;
  error: string | null;
  isFetchCall: boolean;
}

const initialState: QuotesState = {
  quoteList: [],
  sections: [],
  quoteDetails: null,
  current_page: 1,
  last_page: 1,
  loading: false,
  error: null,
  isFetchCall: false,
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(quoteListThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quoteListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const incomingData = action.payload.data;
        const current_page = action.payload.meta.current_page;

        if (current_page === 1) {
          state.quoteList = incomingData;
        } else {
          const existingIds = new Set(state.quoteList.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );
          state.quoteList.push(...uniqueItems);
        }
        state.isFetchCall = false;
        state.current_page = action.payload.meta.current_page;
        state.last_page = action.payload.meta.last_page;
      })
      .addCase(quoteListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createQuoteThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuoteThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isFetchCall = true;
      })
      .addCase(createQuoteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuoteDetailsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quoteDetails = action.payload;
      })
      .addCase(fetchQuoteDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSectionsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSectionsThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isFetchCall = true;
      })
      .addCase(createSectionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSectionsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSectionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sections = action.payload.data;
        state.isFetchCall = false;
      })
      .addCase(getSectionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSectionsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSectionsThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.isFetchCall = true;
      })
      .addCase(deleteSectionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateQuoteThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuoteThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateQuoteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateStatusThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatusThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string
    })
  },
});

export default quotesSlice.reducer;
