import {SubscribersNotifications} from './subscribers-notification';

export class NotificationEntity  {
  id: number;

  title: string;

  body: string;


  subscribersNotifications: SubscribersNotifications[];
}
