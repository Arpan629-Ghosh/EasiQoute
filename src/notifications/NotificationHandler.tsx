import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { EventType } from '@notifee/react-native';
import notifee from '@notifee/react-native';
import { AppDispatch } from '@/redux/store';
import { setFCMToken } from '@/redux/apis/notification/notificationSlice';
import { notificationService } from '@/firebase/notification';
import { notifeeService } from './notifeeService';
import { handleNotificationNavigation } from '@/utils/notificationNavigation';

const NotificationHandler = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notifeeService.createChannel();
        const permission = await notificationService.requestPermission();
        console.log('FCM Permission:', permission);

        if (Platform.OS === 'ios') {
          const notifeePermission = await notifee.requestPermission();
          console.log('NOTIFEE IOS PERMISSION:', notifeePermission);
        }

        if (!permission) {
          console.log('NOTIFICATION PERMISSION DENIED');
          return;
        }

        const token = await notificationService.getFCMToken();
        console.log('FCM TOKEN:', token);

        if (token) {
          dispatch(setFCMToken(token));
        }
      } catch (error) {
        console.log('NOTIFICATION INITIALIZATION ERROR:', error);
      }
    };

    initializeNotifications();

    // FCM received while app is in foreground
    const unsubscribeMessage = notificationService.onForegroundMessage(
      async message => {
        console.log('FOREGROUND FCM:', message);
        await notifeeService.displayForegroundNotification(message);
      },
    );

    // App is open and user taps notification
    const unsubscribeNotifee = notifeeService.onForegroundEvent(
      ({ type, detail }) => {
        if (type !== EventType.PRESS) {
          return;
        }

        console.log('NOTIFICATION PRESSED:', detail.notification);
        handleNotificationNavigation(detail?.notification?.data);
      },
    );

    // App was killed and opened by notification tap
    const checkInitialNotification = async (): Promise<void> => {
      try {
        const initialNotification =
          await notifeeService.getInitialNotification();

        if (!initialNotification) {
          return;
        }

        console.log('APP OPENED FROM NOTIFICATION:', initialNotification);
        handleNotificationNavigation(initialNotification.notification.data);
      } catch (error) {
        console.log('INITIAL NOTIFICATION ERROR:', error);
      }
    };

    checkInitialNotification();

    // FCM token refresh
    const unsubscribeToken = notificationService.onTokenRefresh(token => {
      console.log('FCM TOKEN REFRESHED:', token);

      if (token) {
        dispatch(setFCMToken(token));
      }
    });

    return () => {
      unsubscribeMessage();
      unsubscribeNotifee();
      unsubscribeToken();
    };
  }, [dispatch]);

  return null;
};

export default NotificationHandler;
