import notifee, { AndroidImportance } from '@notifee/react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

const CHANNEL_ID = 'default';

export const notifeeService = {
  createChannel: async () => {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Default Notifications',
      importance: AndroidImportance.HIGH,
    });
  },

  displayForegroundNotification: async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const title = message.notification?.title;
    const body = message.notification?.body;

    if (!title && !body) {
      return;
    }
    
    await notifee.displayNotification({
      title: title ?? 'eaziQoute',
      body: body ?? '',
      data: message.data,

      android: {
        channelId: CHANNEL_ID,
        pressAction: {
          id: 'default',
        },
      },

      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          banner: true,
          list: true,
          sound: true,
          badge: true,
        },
      },
    });

    // console.log('NOTIFEE NOTIFICATION DISPLAYED:', notificationId);
  },

  onForegroundEvent: (
    callback: Parameters<typeof notifee.onForegroundEvent>[0],
  ) => {
    return notifee.onForegroundEvent(callback);
  },

  getInitialNotification: async () => {
    return notifee.getInitialNotification();
  },
};
