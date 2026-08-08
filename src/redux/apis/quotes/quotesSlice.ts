import { createSlice } from '@reduxjs/toolkit';
import {
  CreateQuotePayload,
  QuoteItem,
  QuoteSectionPayload,
  SectionsPayload,
} from '@/types/apis/quote.types';
import {
  createQuoteThunk,
  createSectionsThunk,
  createSelectedSectionsThunk,
  deleteQuoteThunk,
  deleteSectionsThunk,
  duplicateQuoteThunk,
  fetchQuoteDetailsThunk,
  getSectionsThunk,
  getSelectedSectionsThunk,
  quoteListThunk,
  updateQuoteThunk,
  updateStatusThunk,
} from './quotesThunk';

export interface QuotesState {
  quoteList: QuoteItem[];
  sections: SectionsPayload[];
  selectedSections: QuoteSectionPayload[];
  quoteDetails: CreateQuotePayload | null;
  current_page: number;
  last_page: number;
  loadingQuoteDetails: boolean;
  loadingCreateQuote: boolean;
  loadingUpdateQuote: boolean;
  loadingUpdateStatus: boolean;
  loadingSections: boolean;
  loadingQuoteList: boolean;
  loadingDuplicateQuote: boolean;
  loadingDeleteQuote: boolean;
  error: string | null;
  isFetchCall: boolean;
}

const initialState: QuotesState = {
  quoteList: [],
  sections: [],
  selectedSections: [],
  quoteDetails: null,
  current_page: 1,
  last_page: 1,
  loadingQuoteDetails: false,
  loadingCreateQuote: false,
  loadingUpdateQuote: false,
  loadingUpdateStatus: false,
  loadingSections: false,
  loadingQuoteList: false,
  loadingDuplicateQuote: false,
  loadingDeleteQuote: false,
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
        state.loadingQuoteList = true;
        state.error = null;
      })
      .addCase(quoteListThunk.fulfilled, (state, action) => {
        state.loadingQuoteList = false;
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
        state.loadingQuoteList = false;
        state.error = action.payload as string;
      })
      .addCase(createQuoteThunk.pending, state => {
        state.loadingCreateQuote = true;
        state.error = null;
      })
      .addCase(createQuoteThunk.fulfilled, (state, action) => {
        state.loadingCreateQuote = false;
        state.error = null;

        const quote: QuoteItem = {
          id: action.payload.id,
          type: 'quote',
          title: action.payload.title,
          name: action.payload.title,
          reference_number: action.payload.reference_number,
          is_editable: action.payload.is_editable,
          vat_setting_id: String(action.payload.vat_setting_id),
          vat: action.payload.vat,
          status: action.payload.status,
          discount: action.payload.discount
            ? Number(action.payload.discount)
            : null,
          categorised: action.payload.categorised,
          template: action.payload.template,
          price: 0,
          expiry_date: action.payload.expiry_date,
          created_at: action.payload.created_at,
        };

        state.quoteList.unshift(quote);
      })
      .addCase(createQuoteThunk.rejected, (state, action) => {
        state.loadingCreateQuote = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuoteDetailsThunk.pending, state => {
        state.loadingQuoteDetails = true;
        state.error = null;
      })
      .addCase(fetchQuoteDetailsThunk.fulfilled, (state, action) => {
        state.loadingQuoteDetails = false;
        state.error = null;
        state.quoteDetails = action.payload;
      })
      .addCase(fetchQuoteDetailsThunk.rejected, (state, action) => {
        state.loadingQuoteDetails = false;
        state.error = action.payload as string;
      })
      .addCase(createSectionsThunk.pending, state => {
        state.loadingSections = true;
        state.error = null;
      })
      .addCase(createSectionsThunk.fulfilled, state => {
        state.loadingSections = false;
        state.error = null;
        state.isFetchCall = true;
      })
      .addCase(createSectionsThunk.rejected, (state, action) => {
        state.loadingSections = false;
        state.error = action.payload as string;
      })
      .addCase(getSectionsThunk.pending, state => {
        state.loadingSections = true;
        state.error = null;
      })
      .addCase(getSectionsThunk.fulfilled, (state, action) => {
        state.loadingSections = false;
        state.error = null;
        state.sections = action.payload.data;
        state.isFetchCall = false;
      })
      .addCase(getSectionsThunk.rejected, (state, action) => {
        state.loadingSections = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSectionsThunk.pending, state => {
        state.loadingSections = true;
        state.error = null;
      })
      .addCase(deleteSectionsThunk.fulfilled, state => {
        state.loadingSections = false;
        state.error = null;
        state.isFetchCall = true;
      })
      .addCase(deleteSectionsThunk.rejected, (state, action) => {
        state.loadingSections = false;
        state.error = action.payload as string;
      })
      .addCase(updateQuoteThunk.pending, state => {
        state.loadingUpdateQuote = true;
        state.error = null;
      })
      .addCase(updateQuoteThunk.fulfilled, (state, action) => {
        state.loadingUpdateQuote = false;
        state.quoteDetails = action.payload;
        state.error = null;
      })
      .addCase(updateQuoteThunk.rejected, (state, action) => {
        state.loadingUpdateQuote = false;
        state.error = action.payload as string;
      })
      .addCase(updateStatusThunk.pending, state => {
        state.loadingUpdateStatus = true;
        state.error = null;
      })
      .addCase(updateStatusThunk.fulfilled, state => {
        state.loadingUpdateStatus = false;
        state.error = null;
      })
      .addCase(updateStatusThunk.rejected, (state, action) => {
        state.loadingUpdateStatus = false;
        state.error = action.payload as string;
      })
      .addCase(createSelectedSectionsThunk.pending, state => {
        state.loadingSections = true;
        state.error = null;
      })
      .addCase(createSelectedSectionsThunk.fulfilled, state => {
        state.loadingSections = false;
        state.error = null;
      })
      .addCase(createSelectedSectionsThunk.rejected, (state, action) => {
        state.loadingSections = false;
        state.error = action.payload as string;
      })
      .addCase(getSelectedSectionsThunk.pending, state => {
        state.loadingSections = true;
        state.error = null;
      })
      .addCase(getSelectedSectionsThunk.fulfilled, (state, action) => {
        state.loadingSections = false;
        state.error = null;
        state.selectedSections = action.payload.data;
      })
      .addCase(getSelectedSectionsThunk.rejected, (state, action) => {
        state.loadingSections = false;
        state.error = action.payload as string;
      })
      .addCase(duplicateQuoteThunk.pending, state => {
        state.loadingDuplicateQuote = true;
        state.error = null;
      })
      .addCase(duplicateQuoteThunk.fulfilled, state => {
        state.loadingDuplicateQuote = false;
        state.error = null;
      })
      .addCase(duplicateQuoteThunk.rejected, (state, action) => {
        state.loadingDuplicateQuote = false;
        state.error = action.payload as string;
      })
      .addCase(deleteQuoteThunk.pending, state => {
        state.loadingDeleteQuote = true;
        state.error = null;
      })
      .addCase(deleteQuoteThunk.fulfilled, (state, action) => {
        state.loadingDeleteQuote = false;
        state.error = null;

        state.quoteList = state.quoteList.filter(
          quote => quote.id !== action.meta.arg,
        );
      })
      .addCase(deleteQuoteThunk.rejected, (state, action) => {
        state.loadingDeleteQuote = false;
        state.error = action.payload as string;
      });
  },
});

export default quotesSlice.reducer;
