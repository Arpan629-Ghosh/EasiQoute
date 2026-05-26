import { createSlice } from '@reduxjs/toolkit';
import { CreateQuotePayload, QuoteItem } from '@/types/apis/quote.types';
import { createQuoteThunk, fetchQuoteDetailsThunk, quoteListThunk } from './quotesThunk';

export interface QuotesState {
  quoteList: QuoteItem[];
  quoteDetails: CreateQuotePayload | null;
  current_page: number;
  last_page: number;
  loading: boolean;
  error: string | null;
  isFetchCall: boolean;
}

const initialState: QuotesState = {
  quoteList: [],
  quoteDetails: null,
  current_page: 1,
  last_page: 1,
  loading: false,
  error: null,
  isFetchCall: false
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
          state.quoteList = incomingData
        } else {
          const existingIds = new Set(state.quoteList.map(item => item.id));

          const uniqueItems = incomingData.filter(
            item => !existingIds.has(item.id),
          );
          state.quoteList.push(...uniqueItems);
        }
        state.isFetchCall = false;
        state.current_page = action.payload.meta.current_page;
        state.last_page = action.payload.meta.last_page
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
        state.error = action.payload as string
      })
      .addCase(fetchQuoteDetailsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuoteDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quoteDetails = action.payload
      })
      .addCase(fetchQuoteDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
    })
  },
});

export default quotesSlice.reducer;
