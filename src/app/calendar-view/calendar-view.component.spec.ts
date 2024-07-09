import {TestBed, async, inject} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {CalendarViewComponent} from './calendar-view.component';
import {ActivityService} from '../core/services/activity.service';
import {LoggerService} from '../core/services/logger.service';
import {CalendarDay} from '../core/models/calendar.day';
import {Activity} from '../core/models/activity.model';

describe('CalendarViewComponent', () => {
   let spy: any;

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarViewComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: CalendarViewComponent, useClass: CalendarViewComponent },
        { provide: LoggerService, useClass: LoggerService },
        { provide: ActivityService, useClass: ActivityService }
      ]
    }).compileComponents();
  }));

   it('should be initialized', inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
    expect(calendarViewComponent).toBeTruthy();
  }));


   it('should calculate the distance for a row',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
    const calendarDays: CalendarDay[] = [];
    const run1: Activity = new Activity();
    const run2: Activity = new Activity();
    const run3: Activity = new Activity();
    run1.distance = 5.2;
    run2.distance = 6.1;
    run3.distance = 11.8;
    calendarDays.push(new CalendarDay(null, Array.of(run1)), new CalendarDay(null, Array.of(run2)), new CalendarDay(null, Array.of(run3)));
    const result = calendarViewComponent.getDistanceForRow(calendarDays);
    expect(result).toBeCloseTo(23.1, 0.01);
    }));

   it('should calculate the time for a row',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const calendarDays: CalendarDay[] = [];
      const run1: Activity = new Activity();
      const run2: Activity = new Activity();
      const run3: Activity = new Activity();
      run1.activityDuration = { time: '00:20:00'};
      run2.activityDuration = { time: '00:21:00'};
      run3.activityDuration = { time: '00:20:01'};

      calendarDays.push(new CalendarDay(null, Array.of(run1)),
        new CalendarDay(null, Array.of(run2)),
        new CalendarDay(null, Array.of(run3)));
      const result = calendarViewComponent.getTimeForRow(calendarDays);
      expect(result).toBe('01:01:01');
    }));

   it('should calculate the time for a row where the total is 1 hour',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const calendarDays: CalendarDay[] = [];
      const run1: Activity = new Activity();
      const run2: Activity = new Activity();
      const run3: Activity = new Activity();
      run1.activityDuration = { time: '00:20:00'};
      run2.activityDuration = { time: '00:20:00'};
      run3.activityDuration = { time: '00:20:00'};

      calendarDays.push(new CalendarDay(null, Array.of(run1)),
        new CalendarDay(null, Array.of(run2)),
        new CalendarDay(null, Array.of(run3)));
      const result = calendarViewComponent.getTimeForRow(calendarDays);
      expect(result).toBe('01:00:00');
    }));


   it('should calculate the distance for the current month',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const run1: Activity = Activity.fromDateAndDistance(5.3, '2020-02-28');
      const run2: Activity = Activity.fromDateAndDistance(6.2, '2020-03-01');
      const run3: Activity = Activity.fromDateAndDistance(7.1, '2020-03-31');
      const runs: Activity[]  = [];
      runs.push(run1, run2, run3);
      const runService = TestBed.inject(ActivityService);
      spy = spyOn(runService, 'getRunsForDateRange').and.returnValue(runs);
      const currentDate: Date = new Date();
      currentDate.setMonth(2);
      currentDate.setFullYear(2020);
      currentDate.setDate(15);
      calendarViewComponent.currentDate = currentDate;
      const daysInCurrentView: Date[] = CalendarViewComponent.fillDateArray(currentDate);
      calendarViewComponent.fillCalendarDays(daysInCurrentView);
      const result = calendarViewComponent.getDistanceForCurrentMonth();
      expect(result).toBe(13.3);

    }));


   it('should count the activities for the current month',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const run1: Activity = Activity.fromDateAndDistance(5.3, '2020-02-28');
      const run2: Activity = Activity.fromDateAndDistance(6.2, '2020-03-01');
      const run3: Activity = Activity.fromDateAndDistance(7.1, '2020-03-31');

      const runs: Activity[]  = [];
      runs.push(run1, run2, run3);
      const runService = TestBed.inject(ActivityService);
      spy = spyOn(runService, 'getRunsForDateRange').and.returnValue(runs);
      const currentDate: Date = new Date();
      currentDate.setMonth(2);
      currentDate.setFullYear(2020);
      currentDate.setDate(15);
      calendarViewComponent.currentDate = currentDate;
      const daysInCurrentView: Date[] = CalendarViewComponent.fillDateArray(currentDate);
      calendarViewComponent.fillCalendarDays(daysInCurrentView);
      const result = calendarViewComponent.countActivitiesForCurrentMonth();
      expect(result).toBe(2);

    }));



   it('should handle two runs on the same day',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const run1: Activity = Activity.fromDateAndDistance(5.3, '2020-02-28');
      const run2: Activity = Activity.fromDateAndDistance(6.2, '2020-03-01');
      const run3: Activity = Activity.fromDateAndDistance(7.1, '2020-03-31');
      const run4: Activity = Activity.fromDateAndDistance(1.5, '2020-03-31');
      const runs: Activity[]  = [];
      runs.push(run1, run2, run3, run4);
      const runService = TestBed.inject(ActivityService);
      spy = spyOn(runService, 'getRunsForDateRange').and.returnValue(runs);
      const currentDate: Date = new Date();
      currentDate.setMonth(2);
      currentDate.setFullYear(2020);
      currentDate.setDate(15);
      calendarViewComponent.currentDate = currentDate;
      const daysInCurrentView: Date[] = CalendarViewComponent.fillDateArray(currentDate);
      calendarViewComponent.fillCalendarDays(daysInCurrentView);
      const result = calendarViewComponent.getDistanceForCurrentMonth();
      expect(result).toBe(14.8);

    }));

});
