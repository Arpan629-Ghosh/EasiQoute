import { createSlice } from '@reduxjs/toolkit';
import {
  ChangePasswordThunk,
  fetchCategoriesThunk,
  fetchSubCategoriesThunk,
  newCategoriesThunk,
  newSubCategoriesThunk,
  updateProfileThunk,
} from './settingsThunk';
import {
  CreateCategoriesPayload,
  SubCategoriesPayload,
} from '@/types/apis/settings.types';

export interface SettingsState {
  loading: boolean;
  error: string | null;
  data: CreateCategoriesPayload[];
  current_page: number;
  last_page: number;
  subcat_data: SubCategoriesPayload[];
  subcat_current_page: number;
  subcat_last_page: number;
}

const initialState: SettingsState = {
  loading: false,
  error: null,
  data: [],
  current_page: 1,
  last_page: 1,
  subcat_data: [],
  subcat_current_page: 1,
  subcat_last_page: 1
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(updateProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(ChangePasswordThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ChangePasswordThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ChangePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(newCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newCategoriesThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(newCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.data;
        state.current_page = action.payload.meta.current_page;
        state.last_page = action.payload.meta.last_page;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(newSubCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newSubCategoriesThunk.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(newSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
          state.subcat_data = action.payload.data;
          state.subcat_current_page = action.payload.meta.current_page;
          state.subcat_last_page = action.payload.meta.last_page
      })
      .addCase(fetchSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default settingsSlice.reducer;
