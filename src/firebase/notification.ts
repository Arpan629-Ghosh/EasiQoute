import {
  AuthorizationStatus,
  getAPNSToken,
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  registerDeviceForRemoteMessages,
  requestPermission,
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

const messaging = getMessaging();

export const notificationService = {
  requestPermission: async () => {
    const authStatus = await requestPermission(messaging);

    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    return enabled;
  },

  getFCMToken: async () => {
    try {
      await registerDeviceForRemoteMessages(messaging);

      if (Platform.OS === 'ios') {
        const apnsToken = await getAPNSToken(messaging);

        console.log('APNS TOKEN:', apnsToken);

        if (!apnsToken) {
          return '';
        }
      }

      const token = await getToken(messaging);

      console.log('FCM TOKEN:', token);

      return token;
    } catch (error) {
      console.log('FCM TOKEN ERROR:', error);

      return '';
    }
  },

  onForegroundMessage: (
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void,
  ) => {
    return onMessage(messaging, callback);
  },

  onTokenRefresh: (callback: (token: string) => void) => {
    return onTokenRefresh(messaging, callback);
  },
};
