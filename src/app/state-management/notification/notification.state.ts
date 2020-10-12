import {Action, Selector, State, StateContext} from '@ngxs/store';
import {NotificationActions, NotificationStateModel} from './notification.actions';
import {Injectable} from '@angular/core';
import {NotificationsService} from '../../services/notification/notification.service';
import FetchAllNotifications = NotificationActions.FetchAllNotifications;
import {tap} from 'rxjs/operators';
import {NotificationEntity} from '../../models/Notifications/models/notification-entity';
import {append, patch} from '@ngxs/store/operators';
import FetchAllSubscribers = NotificationActions.FetchAllSubscribers;
import {Subscriber} from '../../models/Notifications/models/subscriber';
import SendNewNotification = NotificationActions.SendNewNotification;
import ClearNotifications = NotificationActions.ClearNotifications;


@State<NotificationStateModel>({
  name: 'notificationsData',
  defaults: {
    notifications: null,
    subscribers: null
  }
})
@Injectable()
export class NotificationState {
  constructor(private notificationService: NotificationsService) {
  }

  @Selector()
  static Notifications(state: NotificationStateModel) {
    return state.notifications;
  }

  @Selector()
  static Subscribers(state: NotificationStateModel) {
    return state.subscribers;
  }


  @Action(FetchAllNotifications)
  fetchAllNotifications(ctx: StateContext<NotificationStateModel>, action: FetchAllNotifications) {
    return this.notificationService.getAllNotifications().pipe(
      tap((notifications: NotificationEntity[]) => {
        if (notifications) {
          ctx.setState(patch({
            notifications
          }));
        }
      })
    );
  }

  @Action(FetchAllSubscribers)
  fetchAllSubscribers(ctx: StateContext<NotificationStateModel>, action: FetchAllSubscribers) {
    return this.notificationService.getAllSubscribers().pipe(
      tap((subscribers: Subscriber[]) => {
        if (subscribers) {
          ctx.setState(patch({
            subscribers
          }));
        }
      })
    );
  }

  @Action(SendNewNotification)
  sendNewNotification(ctx: StateContext<NotificationStateModel>, action: SendNewNotification) {
    return this.notificationService.sendNotification(action.notificationPayloadDto).pipe(
      tap((notification: NotificationEntity) => {
        if (notification) {
          ctx.setState(patch({
            notifications: append<NotificationEntity>([notification])
          }));
        }
      })
    );
  }

  @Action(ClearNotifications)
  clearNotifications(ctx: StateContext<NotificationStateModel>, action: ClearNotifications) {
    ctx.setState({
      notifications: null,
      subscribers: null
    });
  }
}
