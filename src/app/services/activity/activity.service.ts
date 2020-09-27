import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivityModel} from '../../models/activity/activity.model';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable(
  {providedIn: 'root'}
)
export class ActivityService {
  constructor(private http: HttpClient) {
  }

  getAllActivities(payload: { take: number, skip?: number }): Observable<ActivityModel[]> {
    let params = new HttpParams();
    const {take, skip} = payload;
    if (take) {
      params = params.append('take', take.toString());
    }
    if (skip) {
      params = params.append('skip', skip.toString());
    }

    return this.http.get<ActivityModel[]>(ApiEndpoints.ActivityEndpoints.rootActivities, {
      params
    });
  }

}
