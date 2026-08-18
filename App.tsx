import './src/localization/i18n';
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
import { navigationRef } from '@/utils/navigationRef';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';

const AppContent = () => {
  const { theme, isDark } = useAppTheme();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  console.log(user);

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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <NavigationContainer
        theme={isDark ? DarkTheme : DefaultTheme}
        ref={navigationRef}
      >
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
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </QueryClientProvider>
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
