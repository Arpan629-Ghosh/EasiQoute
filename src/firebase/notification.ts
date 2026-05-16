import messaging, {
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

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
      const token = await messaging().getToken();

      return token;
    } catch (error) {
      console.log(error);

      return '';
    }
  },
};
