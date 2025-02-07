import {Gear} from './gear.model';
import {ActivityType} from './activity-type.model';

export class Activity {
  id: number;
  date: string;
  course: string;
  distance: number;
  duration: string;
  weather: string;
  comments: string;
  avgHeartRate: number;
  gear: Gear;
  public activityType: ActivityType;

  constructor() {
    this.duration = '00:00:00';
    this.gear = new Gear();
  }

  public static fromDateAndDistance(distance: number, date: string): Activity {
    const activity: Activity = new Activity();
    activity.date = date;
    activity.distance = distance;
    return activity;
  }

  public static clone(activityToClone: Activity): Activity {
    const activity: Activity = new Activity();
    activity.date = activityToClone.date;
    activity.distance = activityToClone.distance;
    activity.id = activityToClone.id;
    activity.avgHeartRate = activityToClone.avgHeartRate;
    activity.duration = activityToClone.duration;
    activity.course = activityToClone.course;
    activity.comments = activityToClone.comments;
    activity.gear = activityToClone.gear;
    activity.weather = activityToClone.weather;
    activity.activityType = activityToClone.activityType;
    return activity;
  }

}
