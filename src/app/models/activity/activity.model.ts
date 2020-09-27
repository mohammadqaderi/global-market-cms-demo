import {ActivityType} from '../../commons/enums/activity-type.enum';

export class ActivityModel {

  id: number;

  action: ActivityType;

  user: string;

  description: string;

  time: Date;
}
