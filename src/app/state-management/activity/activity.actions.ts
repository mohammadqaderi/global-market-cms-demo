import {ActivityModel} from '../../models/activity/activity.model';
import {ActivityDto} from '../../commons/public-dto/activity.dto';

export interface ActivityStateModel {
  activities: ActivityModel[]
}

export class FetchAllActivities {
  static readonly type = '[Activity] Fetch All Activities';

  constructor(public payload: { take: number, skip?: number }) {
  }
}

export class RemoveActivity {
  static readonly type = '[Activity] Remove Activity';

  constructor(public id: number) {
  }
}

export class PushClientActivity {
  static readonly type = '[Activity] Push Client Activity';

  constructor(public activityDto: ActivityDto) {
  }
}

export class PushReturnedActivity {
  static readonly type = '[Activity] Push Returned Activity';

  constructor(public activity: ActivityModel) {
  }
}

export class ClearActivities {
  static readonly type = '[Activity] Clear Activities';

  constructor() {
  }
}
