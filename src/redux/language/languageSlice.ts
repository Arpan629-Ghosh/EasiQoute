import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageMode } from '@/localization/types';

interface LanguageState {
  mode: LanguageMode;
}

const initialState: LanguageState = {
  mode: 'Device',
};

const languageSlice = createSlice({
  name: 'language',

  initialState,

  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageMode>) => {
      state.mode = action.payload;
    },

    resetLanguage: state => {
      state.mode = 'Device';
    },
  },
});

export const { setLanguage, resetLanguage } = languageSlice.actions;

export default languageSlice.reducer;
