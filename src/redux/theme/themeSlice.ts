import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'Light' | 'Dark' | 'Device';

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: 'Device',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
