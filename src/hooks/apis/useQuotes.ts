import { createQuoteThunk, fetchQuoteDetailsThunk, quoteListThunk } from "@/redux/apis/quotes/quotesThunk";
import { AppDispatch, RootState } from "@/redux/store"
import { CreateQuote } from "@/types/apis/quote.types";
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

    return {
      fetchQuotesScreenData,
      createQuote,
      fetchQuoteDetails,
      quoteList: quote.quoteList,
      quoteDetails: quote.quoteDetails,
      loading: quote.loading,
      error: quote.error,
      isFetchCall: quote.isFetchCall,
      current_page: quote.current_page,
      last_page: quote.last_page
    };
}