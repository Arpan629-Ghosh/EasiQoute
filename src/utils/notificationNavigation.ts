import { navigationRef } from './navigationRef';

type NotificationData = {
  landing_screen?: string;
  relevant_id?: string;
  relevant_type?: string;
};

let pendingNotifications: NotificationData | null = null;

const navigateFromNotification = (data: NotificationData) => {
  const { landing_screen, relevant_id } = data;

  if (!relevant_id) {
    console.log('Missing notification relevant_id');
    return;
  }

  const id = Number(relevant_id);

  if (!Number.isInteger(id) || id <= 0) {
    console.log('Invalid relevant id', relevant_id);
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

export const handleNotificationNavigation = (data?: NotificationData) => {
    if (!data) return;

    if (!navigationRef.isReady()) {
        console.log("Navigation is not ready, Storing pending notification", data);
        pendingNotifications = data;
        return;
    }

    navigateFromNotification(data);
}

export const processPendingNotifications = () => {
    if (!navigationRef.isReady()) return;

    if (!pendingNotifications) return;

    const notification = pendingNotifications;
    pendingNotifications = null;

    console.log("Proccessing pending notification", notification);
    navigateFromNotification(notification); 
}