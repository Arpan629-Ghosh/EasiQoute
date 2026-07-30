import {
  createQuoteThunk,
  createSectionsThunk,
  createSelectedSectionsThunk,
  deleteSectionsThunk,
  fetchQuoteDetailsThunk,
  getSectionsThunk,
  getSelectedSectionsThunk,
  quoteListThunk,
  updateQuoteThunk,
  updateStatusThunk,
} from '@/redux/apis/quotes/quotesThunk';

import { AppDispatch, RootState } from '@/redux/store';
import { UpdateInvoiceStatus } from '@/types/apis/invoice.types';
import {
  CreateQuote,
  QuoteSection,
  Sections,
  UpdateQuote,
  UpdateStatus,
} from '@/types/apis/quote.types';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useQuotes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const quote = useSelector((state: RootState) => state.quotes);

  const fetchQuotesScreenData = useCallback(
    (payload: number) => {
      return dispatch(quoteListThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const createQuote = useCallback(
    (payload: CreateQuote) => {
      return dispatch(createQuoteThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const fetchQuoteDetails = useCallback(
    (payload: number) => {
      return dispatch(fetchQuoteDetailsThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const createSections = useCallback(
    (payload: Sections) => {
      return dispatch(createSectionsThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const getSections = useCallback(() => {
    return dispatch(getSectionsThunk()).unwrap();
  }, [dispatch]);

  const deleteSections = useCallback(
    (payload: number) => {
      return dispatch(deleteSectionsThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const updateQuote = useCallback(
    (payload: UpdateQuote) => {
      return dispatch(updateQuoteThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const updateStatus = useCallback(
    (payload: UpdateStatus | UpdateInvoiceStatus) => {
      return dispatch(updateStatusThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const createSelectedSections = useCallback(
    (payload: QuoteSection) => {
      return dispatch(createSelectedSectionsThunk(payload)).unwrap();
    },
    [dispatch],
  );

  const getSelectedSections = useCallback(
    (payload: number) => {
      return dispatch(getSelectedSectionsThunk(payload)).unwrap();
    },
    [dispatch],
  );

  return {
    // actions
    fetchQuotesScreenData,
    createQuote,
    fetchQuoteDetails,
    createSections,
    getSections,
    deleteSections,
    updateQuote,
    updateStatus,
    createSelectedSections,
    getSelectedSections,

    // state
    quoteList: quote.quoteList,
    sections: quote.sections,
    quoteDetails: quote.quoteDetails,
    selectedSections: quote.selectedSections,
    loadingQuoteDetails: quote.loadingQuoteDetails,
    loadingUpdateQuote: quote.loadingUpdateQuote,
    loadingSections: quote.loadingSections,
    loadingQuoteList: quote.loadingQuoteList,

    error: quote.error,
    isFetchCall: quote.isFetchCall,
    current_page: quote.current_page,
    last_page: quote.last_page,
  };
};
