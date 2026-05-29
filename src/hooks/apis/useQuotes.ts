import { createQuoteThunk, createSectionsThunk, deleteSectionsThunk, fetchQuoteDetailsThunk, getSectionsThunk, quoteListThunk, updateQuoteThunk, updateStatusThunk } from "@/redux/apis/quotes/quotesThunk";
import { AppDispatch, RootState } from "@/redux/store"
import { CreateQuote, Sections, UpdateQuote, UpdateStatus } from "@/types/apis/quote.types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"


export const useQuotes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const quote = useSelector((state: RootState) => state.quotes);
    const fetchQuotesScreenData = useCallback((payload: number) => {
        return dispatch(quoteListThunk(payload)).unwrap();
    },[dispatch])
  
  const createQuote = (payload: CreateQuote) => {
      return dispatch(createQuoteThunk(payload)).unwrap()
  }
  
  const fetchQuoteDetails = useCallback((payload: number) => {
    return dispatch(fetchQuoteDetailsThunk(payload)).unwrap();
  }, [dispatch]);

  const createSections = (payload: Sections) => {
    return dispatch(createSectionsThunk(payload)).unwrap();
  }

  const getSections = useCallback(() => {
    return dispatch(getSectionsThunk()).unwrap();
  }, [dispatch])
  
  const deleteSections = (payload: number) => {
    return dispatch(deleteSectionsThunk(payload)).unwrap()
  }

  const updateQuote = (payload: UpdateQuote) => {
    return dispatch(updateQuoteThunk(payload)).unwrap()
  }

  const updateStatus = useCallback((payload: UpdateStatus) => {
    return dispatch(updateStatusThunk(payload)).unwrap();
  },[dispatch])

    return {
      fetchQuotesScreenData,
      createQuote,
      fetchQuoteDetails,
      createSections,
      getSections,
      deleteSections,
      updateQuote,
      updateStatus,
      quoteList: quote.quoteList,
      sections: quote.sections,
      quoteDetails: quote.quoteDetails,
      loading: quote.loading,
      error: quote.error,
      isFetchCall: quote.isFetchCall,
      current_page: quote.current_page,
      last_page: quote.last_page
    };
}