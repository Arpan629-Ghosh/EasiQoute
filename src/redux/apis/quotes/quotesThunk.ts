import { quoteServices } from "@/apis/services/quoteServices";
import { CreateQuote } from "@/types/apis/quote.types";
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