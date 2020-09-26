import {NotificationEntity} from '../../models/Notifications/models/notification-entity';
import {NotificationPayloadDto} from '../../models/Notifications/classes/notification-payload.dto';
import {Subscriber} from '../../models/Notifications/models/subscriber';

export interface NotificationStateModel {
  notifications: NotificationEntity[];
  subscribers: Subscriber[];
}

export namespace NotificationActions {
  export class FetchAllNotifications {
    static readonly type = '[Notification] Fetch All Notifications';

    constructor() {
    }
  }

  export class FetchAllSubscribers {
    static readonly type = '[Notification] Fetch All Subscribers';

    constructor() {
    }
  }

  export class PushNewSubscriber {
    static readonly type = '[Notification] Push New Subscribers';

    constructor(public sub: any) {
    }
  }

  export class ClearNotifications {
    static readonly type = '[Notification] Clear Notifications';

    constructor() {
    }
  }

  export class SendNewNotification {
    static readonly type = '[Notification] Push New Subscribers';

    constructor(public notificationPayloadDto: NotificationPayloadDto) {
    }
  }
}
