import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {NotificationPayloadDto} from '../../models/Notifications/classes/notification-payload.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  getAllSubscribers() {
    return this.http.get(ApiEndpoints.NotificationEndpoints.Subscribers);
  }

  getAllNotifications() {
    return this.http.get(ApiEndpoints.NotificationEndpoints.Notifications);
  }

  addPushSubscriber(sub: any): Observable<any> {
    return this.http.post<any>(ApiEndpoints.NotificationEndpoints.newSubscriber, sub);
  }

  sendNotification(notificationPayloadDto: NotificationPayloadDto): Observable<any> {
    return this.http.post<any>(ApiEndpoints.NotificationEndpoints.sendNotification, notificationPayloadDto);
  }
}
