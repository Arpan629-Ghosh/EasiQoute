import { createSlice } from '@reduxjs/toolkit';
import { homeScreenDataThunk } from './homeThunk';
import { HomeScreenResponse } from '@/types/apis/home.types';

export interface HomeState {
  homeScreenData: HomeScreenResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homeScreenData: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(homeScreenDataThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(homeScreenDataThunk.fulfilled, (state, action) => {
          state.loading = false;
          console.log("redux",action.payload)
        state.homeScreenData = action.payload;
      })
      .addCase(homeScreenDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
