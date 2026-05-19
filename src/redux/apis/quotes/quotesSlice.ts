import { createSlice } from '@reduxjs/toolkit';
import { QuotesPayload } from '@/types/apis/quote.types';
import { quoteListThunk } from './quotesThunk';

export interface QuotesState {
  quoteList: QuotesPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuotesState = {
  quoteList: null,
  loading: false,
  error: null,
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
        console.log('redux', action.payload);
        state.quoteList = action.payload;
      })
      .addCase(quoteListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default quotesSlice.reducer;
