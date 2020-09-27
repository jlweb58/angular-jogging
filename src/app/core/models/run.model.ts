import {Shoes} from './shoes.model';

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
}
