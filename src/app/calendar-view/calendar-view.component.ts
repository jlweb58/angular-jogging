import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../core/services/logger.service';
import {CalendarDay} from '../core/models/calendar.day';
import {ActivityService} from '../core/services/activity.service';
import {Activity} from '../core/models/activity.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  constructor(private logger: LoggerService,
              private activityService: ActivityService,
              private router: Router,
  ) { }

  currentMonth: string;
  currentYear: number;
  calendarDays: CalendarDay[] = [];
  currentDate: Date;

  private static getFormattedTimeString(totalSeconds: number): string {
    const hours =  Math.trunc(totalSeconds / 3600);
    const minutes = Math.trunc((totalSeconds / 60)  % 60);
    const seconds = Math.trunc(totalSeconds % 60);

    let hoursString = hours.toString(10);
    let minutesString = minutes.toString(10);
    let secondsString = seconds.toString(10);

    // left pad numbers less than ten
    if (hours < 10) {
      hoursString = '0' + hoursString;
    }
    if (minutes < 10) {
      minutesString = '0' + minutesString;
    }
    if (seconds < 10) {
      secondsString = '0' + secondsString;
    }
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  private static firstDateInMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private static daysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  private static getSeconds(time: string): number {
    const parts = time.split(':');
    return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }

  private static isSameDate(date1: string, date2: Date): boolean {
    const ms: number = Date.parse(date1);
    const dateToCompare: Date = new Date();
    dateToCompare.setTime(ms);
    return dateToCompare.getFullYear() === date2.getFullYear()
    && dateToCompare.getMonth() === date2.getMonth()
    && dateToCompare.getDate() === date2.getDate();
   }

   // It's a six row month if:
   // the month has 31 days and the 1st is a Sat. or Sun;
   // the month has 30 days and the 1st is a Sun.
  private static getNumberOfRowsForMonth(numDaysInMonth, firstDateInMonth: Date): number {
    if (numDaysInMonth === 28 && firstDateInMonth.getDay() === 1) {
      return 4;
    } else {
      if (firstDateInMonth.getDay() === 0 || (firstDateInMonth.getDay() === 6 && numDaysInMonth === 31)) {
        return 6;
      } else {
        return 5;
      }
    }
  }

  static fillDateArray(today: Date): Date[] {
    const daysInCurrentView: Date[] = [];
    const daysInCurrentMonth = CalendarViewComponent.daysInMonth(today);
    const firstDateInMonth = CalendarViewComponent.firstDateInMonth(today);
    const numberOfDates = CalendarViewComponent.getNumberOfRowsForMonth(daysInCurrentMonth, firstDateInMonth) * 7;
    let offset = firstDateInMonth.getDay() - 1; // Sunday = 0, we start the week with Monday
    if (offset < 0) {
      offset = 6;
    }
    const startDate = firstDateInMonth;
    startDate.setDate(startDate.getDate() - offset);
    for (let i = 0; i < numberOfDates; i++) {
      const nextDate = new Date();
      nextDate.setTime(startDate.getTime());
      daysInCurrentView.push(nextDate);
      startDate.setDate(startDate.getDate() + 1);
    }

    daysInCurrentView[numberOfDates - 1].setHours(23);
    daysInCurrentView[numberOfDates - 1].setMinutes(59);
    daysInCurrentView[numberOfDates - 1].setSeconds(59);
    return daysInCurrentView;
  }

  ngOnInit(): void {
    this.activityService.loadAll();
    this.activityService.getActivities().subscribe(results => {
      if (!results) {
        return;
      }
      this.currentDate = new Date();
      this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
      this.currentYear = this.currentDate.getFullYear();
      const daysInCurrentView: Date[] = CalendarViewComponent.fillDateArray(this.currentDate);
      this.fillCalendarDays(daysInCurrentView);
    });

  }

  prevMonth(): void {
    this.changeMonth(-1);
  }

  nextMonth(): void {
    this.changeMonth(1);
  }

  private changeMonth(amount: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + amount);
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    const daysInCurrentView: Date[] = CalendarViewComponent.fillDateArray(this.currentDate);
    this.fillCalendarDays(daysInCurrentView);
  }

  getDistanceForRow(row: CalendarDay[]): number {
    let res = 0;
    row.forEach(d => {
      if (d.activities) {
        res += d.activities.reduce((sum: number, b: Activity) => sum + b.distance, 0);
      }
    });
    return res;
  }

  getTimeForRow(row: CalendarDay[]): string {
    const secondsSum = row.filter((calendarDay: CalendarDay) => calendarDay.activities)
      .flatMap(day => day.activities)
      .reduce((sum: number, activity: Activity) => sum + CalendarViewComponent.getSeconds(activity.activityDuration.time), 0);

    return CalendarViewComponent.getFormattedTimeString(secondsSum);
  }

  getRow(index: number): CalendarDay[] {
    // 0-6, 7-13, 14-20, 21-27, 28-34, 35-41
    switch (index) {
      case 1:
        return this.calendarDays.slice(0, 7);
      case 2:
        return this.calendarDays.slice(7, 14);
      case 3:
        return this.calendarDays.slice(14, 21);
      case 4:
        return this.calendarDays.slice(21, 28);
      case 5:
        if (this.calendarDays.length > 28) {
          return this.calendarDays.slice(28, 35);
        } else {
          return null;
        }
      case 6:
        if (this.calendarDays.length > 35) {
          return this.calendarDays.slice(35, 42);
        } else {
          return null;
        }
    }
  }

  fillCalendarDays(daysInCurrentView: Date[]): void {
    this.calendarDays = [];
    const currentDaysLength = daysInCurrentView.length;
    const runs: Activity[] = this.activityService.getActivitiesForDateRange(daysInCurrentView[0], daysInCurrentView[currentDaysLength - 1]);
    daysInCurrentView.forEach(d => {
      this.calendarDays.push(new CalendarDay(d, this.getActivitiesForDate(d, runs)));
    });
  }

  getActivitiesForDate(day: Date, activities: Activity[]): Activity[] {
    const retVal: Activity[] = [];
    activities.forEach(a => {
      if (CalendarViewComponent.isSameDate(a.date, day)) {
        retVal.push(a);
      }
    });
    return retVal;
  }

  getClassForDate(date: Date): string {
    if (date.getMonth() === this.currentDate.getMonth()) {
      return 'calendar-table-cell';
    }
    return 'calendar-table-cell other-month';
  }

  countActivitiesForCurrentMonth(): number {
    return this.calendarDays.filter((d: CalendarDay) => d.activities && d.day.getMonth() === this.currentDate.getMonth())
      .flatMap(day => day.activities)
      .length;
  }

  getDistanceForCurrentMonth(): number {
    return this.calendarDays.filter((d: CalendarDay) => d.activities && d.day.getMonth() === this.currentDate.getMonth())
      .flatMap(day => day.activities)
      .reduce((sum: number, activity: Activity) => sum + activity.distance, 0);
  }

  getTimeForCurrentMonth(): string {
    return this.getTimeForRow(this.calendarDays.filter((d: CalendarDay) =>
      d.activities && d.day.getMonth() === this.currentDate.getMonth()));
  }

  showActivity(activity: Activity): void {
    this.router.navigate(['/activity'], {state: {activity}});
   }

}
