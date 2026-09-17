import './src/localization/i18n';
import React, { useEffect } from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import RootStack from './src/navigation/RootStack';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, persistor, RootState, store } from '@/redux/store';

import { useAppTheme } from '@/hooks/useAppTheme';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { notificationService } from '@/firebase/notification';
import { setFCMToken } from '@/redux/apis/notification/notificationSlice';
import ToastProvider from '@/components/toast/ToastContext';
import { navigationRef } from '@/utils/navigationRef';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';
import { useTranslation } from 'react-i18next';

const AppContent = () => {
  const { theme, isDark } = useAppTheme();
  const dispatch = useDispatch<AppDispatch>();
  

  const { i18n } = useTranslation();

  const language = useSelector((state: RootState) => state.language.mode);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    const setupFCM = async () => {
      const permission = await notificationService.requestPermission();

      console.log('Notification permission:', permission);

      if (!permission) {
        console.log('Notification permission denied');
        return;
      }

      const token = await notificationService.getFCMToken();

      if (token) {
        dispatch(setFCMToken(token));
      }
    };

    setupFCM();

    // App is OPEN and notification arrives
    const unsubscribeForeground = notificationService.onForegroundMessage(
      message => {
        console.log('FOREGROUND NOTIFICATION:', message);

        // Handle your UI here
        // Example:
        // showToast(message.notification?.title);
      },
    );

    // App is in BACKGROUND and user taps notification
    const unsubscribeOpened = notificationService.onNotificationOpened(
      message => {
        console.log('BACKGROUND NOTIFICATION OPENED:', message);

        // Navigate here if needed
        // Example:
        // navigation.navigate('NotificationDetails', {
        //   id: message.data?.id,
        // });
      },
    );

    // App was completely KILLED and user taps notification
    const checkInitialNotification = async () => {
      const message = await notificationService.getInitialNotification();

      if (message) {
        console.log('KILLED APP OPENED FROM NOTIFICATION:', message);

        // Navigate here if needed
      }
    };

    checkInitialNotification();

    // FCM token changes
    const unsubscribeToken = notificationService.onTokenRefresh(token => {
      console.log('FCM TOKEN REFRESHED:', token);

      if (token) {
        dispatch(setFCMToken(token));
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
      unsubscribeToken();
    };
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
