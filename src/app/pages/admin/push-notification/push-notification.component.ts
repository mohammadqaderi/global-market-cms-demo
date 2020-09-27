import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {NotificationPayloadDto} from '../../../models/Notifications/classes/notification-payload.dto';
import {Store} from '@ngxs/store';
import {editorConfig} from '../../../commons/constants';
import {NotificationActions} from '../../../state-management/notification/notification.actions';
import SendNewNotification = NotificationActions.SendNewNotification;
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent implements OnInit {

  @Input() helperService: HelperService;
  @Input() gdService: GlobalDataService;
  @Input() store: Store;
  config = editorConfig;
  notificationPayloadDto: NotificationPayloadDto = new NotificationPayloadDto();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor() {
  }

  sendNotification() {
    this.helperService.showSpinner('Sending Notification, Please Wait...');
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.User.username,
      action: ActivityType.SEND_NOTIFICATION,
      description: `${this.gdService.User.username} has send a new notification to the users`
    }));
    this.store.dispatch(new SendNewNotification(this.notificationPayloadDto)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Notification sent successfully', 'Okay');
    });
  }

  ngOnInit(): void {
  }

}
