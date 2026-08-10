import { homeService } from "@/apis/services/home.services";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const homeScreenDataThunk = createAsyncThunk('/api/home',

    async (_: void, thunkAPI) => {
        try {
            const response = await homeService.homeScreenData();
            if (!response.result) {
                return thunkAPI.rejectWithValue(response.message)
            }
            return response.payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);