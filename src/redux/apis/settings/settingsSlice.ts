import { createSlice } from "@reduxjs/toolkit";
import { ChangePasswordThunk, fetchCategoriesThunk, newCategoriesThunk, updateProfileThunk } from "./settingsThunk";


export interface SettingsState {
    loading: boolean;
    error: string | null;
}

const initialState = {
    loading: false,
    error: null,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(updateProfileThunk.pending, state => {
            state.loading = true;
            state.error = null;
        })
            .addCase(updateProfileThunk.fulfilled, state => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as null
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
                state.error = action.payload as null
            })
            .addCase(newCategoriesThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(newCategoriesThunk.fulfilled, state => {
                state.loading = false;
                state.error = null
            })
            .addCase(newCategoriesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as null
            })
            .addCase(fetchCategoriesThunk.pending, state => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchCategoriesThunk.fulfilled, state => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCategoriesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as null
        })
    }
})

export default settingsSlice.reducer;