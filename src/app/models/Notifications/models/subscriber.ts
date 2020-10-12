import {Key} from '../classes/key';
import {SubscribersNotifications} from './subscribers-notification';

export class Subscriber {
  id: number;

  endpoint: string;

  expirationTime: Date;
  email: string;

  keys: Key;

  subscribersNotifications: SubscribersNotifications[];

}
