import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import authReducer from './apis/auth/authSlice';
import notificationReducer from './apis/notification/notificationSlice'
import homeReducer from './apis/home/homeSlice'
import quotesReducer from './apis/quotes/quotesSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  notification: notificationReducer,
  home: homeReducer,
  quotes: quotesReducer
});

export default rootReducer;
