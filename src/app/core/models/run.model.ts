import {Shoes} from './shoes.model';
import {ActivityType} from './activity-type.model';

export class Run {
  id: number;
  date: string;
  course: string;
  distance: number;
  runDuration: {
    time: string;
  };
  weather: string;
  comments: string;
  avgHeartRate: number;
  shoes: Shoes;
  public activityType: ActivityType;

  constructor() {
    this.runDuration = {
      time: ''
    };
    this.shoes = new Shoes();
  }

  public static fromDateAndDistance(distance: number, date: string): Run {
    const run: Run = new Run();
    run.date = date;
    run.distance = distance;
    return run;
  }

  public static clone(runToClone: Run): Run {
    const run: Run = new Run();
    run.date = runToClone.date;
    run.distance = runToClone.distance;
    run.id = runToClone.id;
    run.avgHeartRate = runToClone.avgHeartRate;
    run.runDuration = runToClone.runDuration;
    run.course = runToClone.course;
    run.comments = runToClone.comments;
    run.shoes = runToClone.shoes;
    run.weather = runToClone.weather;
    run.activityType = runToClone.activityType;
    return run;
  }

}
