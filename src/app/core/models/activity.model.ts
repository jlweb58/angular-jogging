import {Shoes} from './shoes.model';
import {ActivityType} from './activity-type.model';

export class Activity {
  id: number;
  date: string;
  course: string;
  distance: number;
  activityDuration: {
    time: string;
  };
  weather: string;
  comments: string;
  avgHeartRate: number;
  shoes: Shoes;
  public activityType: ActivityType;

  constructor() {
    this.activityDuration = {
      time: ''
    };
    this.shoes = new Shoes();
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
    activity.activityDuration = activityToClone.activityDuration;
    activity.course = activityToClone.course;
    activity.comments = activityToClone.comments;
    activity.shoes = activityToClone.shoes;
    activity.weather = activityToClone.weather;
    activity.activityType = activityToClone.activityType;
    return activity;
  }

}
