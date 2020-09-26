import { NotificationData } from '../classes/notification-data';
export class SubscribersNotifications  {
  id: number;

  title: string;

  body: string;

  data: NotificationData;

  actions: { title: string, action: string }[];

  vibrate: number[];

  subscriberId: number;

  notificationId: number;
}
