import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    fcmToken: string | null
}

const initialState: NotificationState = {
  fcmToken: null,
};

const notificationSlice = createSlice({
  name: 'notification',

  initialState,

  reducers: {
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },

    clearFCMToken: state => {
      state.fcmToken = null;
    },
  },
});

export const { setFCMToken, clearFCMToken } = notificationSlice.actions;

export default notificationSlice.reducer;
