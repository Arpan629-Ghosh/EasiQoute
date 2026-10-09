import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import authReducer from './apis/auth/authSlice';
import notificationReducer from './apis/notification/notificationSlice'
import settingsReducer from './apis/settings/settingsSlice'
import clientsReducer from './apis/client/clientSlice'
import languageReducer from './language/languageSlice'

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  notification: notificationReducer,
  settings: settingsReducer,
  clients: clientsReducer,
  language: languageReducer,
});

export default rootReducer;
