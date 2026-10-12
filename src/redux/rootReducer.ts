import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import authReducer from './apis/auth/authSlice';
import notificationReducer from './apis/notification/notificationSlice'
import languageReducer from './language/languageSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  notification: notificationReducer,
  language: languageReducer,
});

export default rootReducer;
