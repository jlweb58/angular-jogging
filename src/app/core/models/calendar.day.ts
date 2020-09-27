import {Run} from './run.model';

export class CalendarDay {

  day: Date;
  runs: Run[];

  constructor(d: Date, run: Run[]) {
    this.day = d;
    this.runs = run;
  }

}
