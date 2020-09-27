import {ActivityType} from "../enums/activity-type.enum";

export class ActivityDto {
  action: ActivityType;
  user: string;
  description: string;
}
