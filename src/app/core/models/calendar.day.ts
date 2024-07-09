import {Activity} from './activity.model';

export class CalendarDay {

  day: Date;
  activities: Activity[];

  constructor(d: Date, activities: Activity[]) {
    this.day = d;
    this.activities = activities;
  }

}
