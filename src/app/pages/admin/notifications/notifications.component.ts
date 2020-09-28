import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserActions} from '../../../state-management/user/user.actions';
import {NotificationActions} from '../../../state-management/notification/notification.actions';
import FetchSystemUsers = UserActions.FetchSystemUsers;
import FetchAllNotifications = NotificationActions.FetchAllNotifications;
import FetchAllSubscribers = NotificationActions.FetchAllSubscribers;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'body'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(
    public store: Store,
    public helperService: HelperService,
    public gdService: GlobalDataService) {

    if (!gdService.Users) {
      this.store.dispatch(new FetchSystemUsers()).subscribe(() => {
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    }

    if (!this.gdService.Notifications) {
      this.helperService.showSpinner('Loading Notifications...');
      this.store.dispatch(new FetchAllNotifications()).subscribe(() => {
        this.refreshNotifications();
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    } else {
      this.refreshNotifications();
    }
    if (!this.gdService.Subscribers) {
      this.helperService.showSpinner('Loading Subscribers...');
      this.store.dispatch(new FetchAllSubscribers()).subscribe(() => {
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.hideDialog();
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    }
  }

  ngOnInit() {
    this.helperService.notificationsDataSource.sort = this.sort;
    this.helperService.notificationsDataSource.paginator = this.paginator;
  }

  get Notifications() {
    return this.gdService.Notifications;
  }


  refreshNotifications() {
    this.helperService.notificationsDataSource.data = this.Notifications;
  }

  get Subscribers() {
    return this.gdService.Subscribers;
  }

}
