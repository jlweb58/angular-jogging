import {Activity} from './activity.model';

export class CalendarDay {

  day: Date;
  runs: Activity[];

  constructor(d: Date, run: Activity[]) {
    this.day = d;
    this.runs = run;
  }

}
