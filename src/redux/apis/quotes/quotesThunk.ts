import { quoteServices } from "@/apis/services/quoteServices";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const quoteListThunk = createAsyncThunk('/api/quotes', 
    async (_: void, thunkAPI) => {
        try {
            const response = await quoteServices.quoteList();
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);