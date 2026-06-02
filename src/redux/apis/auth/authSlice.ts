import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types/apis/auth.types';
import { companyProfileSetupThunk, forgotPasswordThunk, loginThunk, logoutThunk, profileSetupThunk, signupThunk } from './authThunks';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  // login
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.accessToken = action.payload.access_token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
        
      //signup
      .addCase(signupThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.accessToken = action.payload.access_token;
      })

      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

        //forgotpassword
      .addCase(forgotPasswordThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(forgotPasswordThunk.fulfilled, state => {
        state.loading = false;
      })

      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    
    // profile_setup
      .addCase(profileSetupThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileSetupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(profileSetupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      })
    
    //company_profile_setup

      .addCase(companyProfileSetupThunk.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(companyProfileSetupThunk.fulfilled, (state) => {
        state.loading = false;
        if (state.user) {
          state.user.is_company_profile_setup = true;
        }
      })
      .addCase(companyProfileSetupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      })
    
    //logout
      .addCase(logoutThunk.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
    })
  },
});

export default authSlice.reducer;
