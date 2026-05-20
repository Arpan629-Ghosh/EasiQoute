import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import RootStack from './src/navigation/RootStack';

import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, persistor, store } from '@/redux/store';

import { useAppTheme } from '@/hooks/useAppTheme';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { notificationService } from '@/firebase/notification';
import { setFCMToken } from '@/redux/apis/notification/notificationSlice';
import ToastProvider from '@/components/toast/ToastContext';
import { useAuth } from '@/hooks/apis/useAuth';


const AppContent = () => {

  const { theme, isDark } = useAppTheme();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  // const { user } = useAuth();
  console.log(user)
  

  useEffect(() => {
    const setupFCM = async () => {
      await notificationService.requestPermission();

      const token = await notificationService.getFCMToken();

      // console.log('FCM TOKEN', token);
      if (token) {
        dispatch(setFCMToken(token));
      }
    };
    
    setupFCM();
  }, [dispatch]);

  // useEffect(() => {
  //   const clear = async () => {
  //     await storage.clearSession();

  //     await persistor.purge();

  //     console.log('SESSION CLEARED', user);
  //   };

  //   clear();
  // }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <NavigationContainer  theme={isDark ? DarkTheme : DefaultTheme}>
        <RootStack />
      </NavigationContainer>
    </View>
  );
};


function App() {
 
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
