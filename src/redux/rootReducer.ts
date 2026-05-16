import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import authReducer from './apis/auth/authSlice';
import notificationReducer from './apis/notification/notificationSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  notification: notificationReducer
});

export default rootReducer;
