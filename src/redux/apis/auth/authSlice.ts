import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/apis/auth.types';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}

interface CredentialsPayload {
  user: User;
  accessToken: string;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },

    clearAuth: state => {
      state.user = null;
      state.accessToken = null;
    },

    clearAuthError: () => {
      // No global API error is maintained in this slice anymore.
    },
  },
});

export const {
  setCredentials,
  setUser,
  setAccessToken,
  clearAuth,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
