import { authServices } from '@/apis/services/authServices';
import { storage } from '@/storage/asyncStorage';
import { ForgotPasswordPayload, LoginPayload, ProfileSetupPayload, SignupPayload } from '@/types/apis/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const loginThunk = createAsyncThunk(
  'api/auth/login',

  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await authServices.login(payload);

      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }

      const authData = response.payload;

      await storage.setAccessToken(authData.access_token);
      await storage.setUser(authData);

      return authData;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

export const signupThunk = createAsyncThunk(
  'api/auth/signup',

  async (payload: SignupPayload, thunkAPI) => {
      try {
          const response = await authServices.signup(payload); 
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      const authData = response.payload;
      return authData;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

export const forgotPasswordThunk = createAsyncThunk(
  'api/auth/forgotPassword',

  async (payload: ForgotPasswordPayload, thunkAPI) => {
    try {
      const response = await authServices.forgotPassword(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.message;
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },


);

export const profileSetupThunk = createAsyncThunk('/api/users/profile-setup', 
  async (payload: ProfileSetupPayload, thunkAPI) => {
    try {
      const response = await authServices.profileSetup(payload);
      if (!response.result) {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue("Something went wrong")
    }
  }
);
