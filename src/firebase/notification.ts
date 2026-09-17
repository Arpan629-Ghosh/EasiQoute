import messaging, {
  FirebaseMessagingTypes,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export const notificationService = {
  requestPermission: async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    return enabled;
  },

  getFCMToken: async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();

      if (Platform.OS === 'ios') {
        const apnsToken = await messaging().getAPNSToken();

        console.log('APNS TOKEN:', apnsToken);

        if (!apnsToken) {
          return '';
        }
      }

      const token = await messaging().getToken();

      console.log('FCM TOKEN:', token);

      return token;
    } catch (error) {
      console.log('FCM token error:', error);
      return '';
    }
  },

  onForegroundMessage: (
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void,
  ) => {
    return messaging().onMessage(callback);
  },

  onNotificationOpened: (
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void,
  ) => {
    return messaging().onNotificationOpenedApp(callback);
  },

  getInitialNotification: async () => {
    return messaging().getInitialNotification();
  },

  onTokenRefresh: (callback: (token: string) => void) => {
    return messaging().onTokenRefresh(callback);
  },
};
