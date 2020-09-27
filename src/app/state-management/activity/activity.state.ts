import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {ActivityStateModel, ClearActivities, FetchAllActivities, PushClientActivity, PushReturnedActivity} from './activity.actions';
import {Socket} from 'ngx-socket-io';
import {ActivityService} from '../../services/activity/activity.service';
import {tap} from 'rxjs/operators';
import {ActivityModel} from '../../models/activity/activity.model';
import {append, patch} from '@ngxs/store/operators';
import {Injectable} from '@angular/core';
import {AuthState} from '../auth/auth.state';


@State<ActivityStateModel>({
  name: 'activities',
  defaults: {
    activities: null
  }
})
@Injectable()
export class ActivityState implements NgxsOnInit {
  constructor(private socket: Socket,
              private activityService: ActivityService,
              private store: Store) {
  }


  @Selector()
  static Activities(state: ActivityStateModel) {
    return state.activities;
  }

  @Action(FetchAllActivities)
  fetchAllActivities(ctx: StateContext<ActivityStateModel>, action: FetchAllActivities) {
    return this.activityService.getAllActivities(action.payload).pipe(
      tap((activities: ActivityModel[]) => {
        if (activities) {
          ctx.setState({
            activities
          });
        }
      })
    );
  }

  @Action(PushClientActivity)
  pushClientActivity(ctx: StateContext<ActivityStateModel>, action: PushClientActivity) {
    this.socket.emit('push-new-activity', {
      activityDto: action.activityDto
    });
  }

  @Action(PushReturnedActivity)
  pushReturnedActivity(ctx: StateContext<ActivityStateModel>, action: PushReturnedActivity) {
    ctx.setState(patch({
      activities: append<ActivityModel>([action.activity])
    }));
  }

  @Action(ClearActivities)
  clearActivities(ctx: StateContext<ActivityStateModel>, action: ClearActivities) {
    ctx.setState({
      activities: null
    });
  }

  ngxsOnInit(ctx?: StateContext<any>): void | any {
    if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
      this.store.dispatch(new FetchAllActivities({take: 10}));
      this.socket.on('activity', activity => {
        this.store.dispatch(new PushReturnedActivity(activity));
      });
    }
  }
}
