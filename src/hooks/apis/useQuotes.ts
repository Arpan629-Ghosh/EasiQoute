import { quoteListThunk } from "@/redux/apis/quotes/quotesThunk";
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"


export const useQuotes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const quote = useSelector((state: RootState) => state.quotes);
    const fetchQuotesScreenData = async () => {
        return dispatch(quoteListThunk()).unwrap();
    }

    return {
      fetchQuotesScreenData,
      quoteList: quote.quoteList,
      loading: quote.loading,
      error: quote.error,
    };
}