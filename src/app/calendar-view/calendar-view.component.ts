import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../services/logger.service';
import {CalendarDay} from '../core/models/calendar.day';
import {RunService} from '../services/run.service';
import {Run} from '../core/models/run.model';
import {RunDialogComponent} from '../run-dialog/run-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  currentMonth: string;
  currentYear: number;
  daysInCurrentView: Date[] = [];
  calendarDays: CalendarDay[] = [];
  currentDate: Date;

  constructor(private logger: LoggerService,
              private runService: RunService,
              private dialog: MatDialog,
  ) { }

  // Need to redo this - just have the calendarday array, either it has a run or not

  ngOnInit(): void {
    this.runService.loadAll();
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.fillDateArray(this.currentDate);
    this.fillCalendarDays();
  }

  prevMonth(): void {
    this.changeMonth(-1);
  }

  nextMonth(): void {
    this.changeMonth(1);
  }

  changeMonth(amount: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + amount);
    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.fillDateArray(this.currentDate);
    this.fillCalendarDays();
  }

  getDistanceForRow(row: CalendarDay[]): number {
    let res = 0;
    row.forEach(d => {
      if (d.run) {
        res += d.run.distance;
      }
    });
    return res;
  }

  getTimeForRow(row: CalendarDay[]): string {
    let secondsSum = 0;
    row.forEach(d => {
      if (d.run && d.run.runDuration) {
        secondsSum += this.getSeconds(d.run.runDuration.time);
      }
    });

    return this.getFormattedTimeString(secondsSum);
  }

  getFormattedTimeString(totalSeconds: number): string {
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

  getSeconds(time: string) {
    const parts = time.split(':');
    return parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }

  getRow(index: number): CalendarDay[] {
    // 0-6, 7-13, 14-20, 21-27, 28-34
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
        return this.calendarDays.slice(28, 35);
    }
  }


  fillCalendarDays(): void {
    this.calendarDays = [];
    const runs: Run[] = this.runService.getRunsForDateRange(this.daysInCurrentView[0], this.daysInCurrentView[34]);
    this.logger.log('Got runs: ' + runs.length);
    this.daysInCurrentView.forEach(d => {
      const run: Run = this.getRunForDate(d, runs);
      this.calendarDays.push(new CalendarDay(d, run));
    });
    this.logger.log('Created calendar days: ' + this.calendarDays.length);
  }

  getRunForDate(day: Date, runs: Run[]): Run {
    let retVal: Run = null;
    runs.forEach(r => {
      if (this.isSameDate(r.date, day)) {
        retVal = r;
      }
    });
    return retVal;
  }

  isSameDate(date1: string, date2: Date): boolean {
    const ms: number = Date.parse(date1);
    const dateToCompare: Date = new Date();
    dateToCompare.setTime(ms);
    return dateToCompare.getFullYear() === date2.getFullYear()
    && dateToCompare.getMonth() === date2.getMonth()
    && dateToCompare.getDate() === date2.getDate();
   }

  fillDateArray(today: Date): void {
    this.daysInCurrentView = [];
    const daysInCurrentMonth = this.daysInMonth(today);
    const firstDateInMonth = this.firstDateInMonth(today);
    let offset = firstDateInMonth.getDay() - 1; // Sunday = 0, we start the week with Monday
    if (offset < 0) {
      offset = 6;
    }
    const startDate = firstDateInMonth;
    startDate.setDate(startDate.getDate() - offset);
    this.logger.log('start date: ' + startDate);
    const numberOfDates = 35;
    for (let i = 0; i < numberOfDates; i++) {
      const nextDate = new Date();
      nextDate.setTime(startDate.getTime());
      this.daysInCurrentView.push(nextDate);
      startDate.setDate(startDate.getDate() + 1);
    }

  }

  firstDateInMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  daysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  getClassForDate(date: Date): string {
    if (date.getMonth() === this.currentDate.getMonth()) {
      return 'calendar-table-cell';
    }
    return 'calendar-table-cell other-month';
  }

  countActivitiesForCurrentMonth(): number {
    let retVal = 0;
    this.calendarDays.forEach(d => {
      if (d.run) {
        retVal++;
      }
    });
    return retVal;
  }

  getDistanceForCurrentMonth(): number {
    let retVal = 0;
    this.calendarDays.forEach(d => {
      if (d.run) {
        retVal += d.run.distance;
      }
    });
    return retVal;
  }

  getTimeForCurrentMonth(): string {
    return this.getTimeForRow(this.calendarDays);
  }

  showActivity(run: Run): void {
    this.logger.log('Showing activity');
    const dialogRef = this.dialog.open(RunDialogComponent);
    dialogRef.componentInstance.run = run;
    dialogRef.componentInstance.isEdit = true;
    dialogRef.afterClosed().subscribe(result => {
      this.logger.log('The dialog was closed');
    });
  }

}
