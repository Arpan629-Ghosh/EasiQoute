import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { EventType } from '@notifee/react-native';
import notifee from '@notifee/react-native';
import { AppDispatch } from '@/redux/store';
import { setFCMToken } from '@/redux/apis/notification/notificationSlice';
import { notificationService } from '@/firebase/notification';
import { notifeeService } from './notifeeService';
import { navigationRef } from '@/utils/navigationRef';

type NotificationData = {
  landing_screen?: string;
  relevant_id?: string;
  relevant_type?: string;
};

const handleNotificationNavigation = (data?: NotificationData) => {
    if (!data) {
      return;
    }

    const { landing_screen, relevant_id } = data;

    if (!navigationRef.isReady()) {
      console.log('Navigation is not ready');
      return;
    }

    if (!relevant_id) {
      console.log('Missing notification relevant_id');
      return;
    }

    const id = Number(relevant_id);

    if (!id) {
      console.log('Invalid notification relevant_id:', relevant_id);
      return;
    }

    switch (landing_screen) {
      case 'invoice':
        navigationRef.navigate('InvoiceDetailsScreens', {
          invoiceId: id,
        });
        break;

      case 'payment':
        navigationRef.navigate('PaymentDetailsScreen', {
          paymentId: id,
        });
        break;

      case 'quote':
        navigationRef.navigate('QouteDetailScreen', {
          quoteId: id,
        });
        break;

      case 'client':
        navigationRef.navigate('ClientDetailScreen', {
          clientId: id,
        });
        break;

      default:
        console.log('UNKNOWN NOTIFICATION LANDING SCREEN:', landing_screen);
    }
};

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

    // fcm received when app is opened in forground
    const unsubscribeMessage = notificationService.onForegroundMessage(
      async message => {
        console.log('FOREGROUND FCM:', message);

        await notifeeService.displayForegroundNotification(message);
      },
    );

    // App is open and user taps on notification
    const unsubscribeNotifee = notifeeService.onForegroundEvent(
      ({ type, detail }) => {
        if (type !== EventType.PRESS) {
          return;
        }

        console.log('NOTIFICATION PRESSED:', detail.notification);

        handleNotificationNavigation(detail.notification?.data);
      },
    );

   // App was killed but opened after user clicks on notification
    const checkInitialNotification = async () => {
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

    /**
     * FCM TOKEN REFRESH
     */
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
