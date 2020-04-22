import {Run} from './run.model';

export class CalendarDay {

  day: Date;
  run: Run;

  constructor(d: Date, run: Run) {
    this.day = d;
    this.run = run;
  }

}
