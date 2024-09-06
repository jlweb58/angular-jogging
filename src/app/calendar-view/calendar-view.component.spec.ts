import {getTestBed, waitForAsync, inject} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {CalendarViewComponent} from './calendar-view.component';
import {ActivityService} from '../core/services/activity.service';
import {LoggerService} from '../core/services/logger.service';
import {CalendarDay} from '../core/models/calendar.day';
import {Activity} from '../core/models/activity.model';

describe('CalendarViewComponent', () => {
   let spy: any;

   beforeEach(waitForAsync(() => {
    getTestBed().configureTestingModule({
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
    const activity1: Activity = new Activity();
    const activity2: Activity = new Activity();
    const activity3: Activity = new Activity();
    activity1.distance = 5.2;
    activity2.distance = 6.1;
    activity3.distance = 11.8;
    calendarDays.push(new CalendarDay(null, Array.of(activity1)), new CalendarDay(null, Array.of(activity2)),
      new CalendarDay(null, Array.of(activity3)));
    const result = calendarViewComponent.getDistanceForRow(calendarDays);
    expect(result).toBeCloseTo(23.1, 0.01);
    }));

   it('should calculate the time for a row',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const calendarDays: CalendarDay[] = [];
      const activity1: Activity = new Activity();
      const activity2: Activity = new Activity();
      const activity3: Activity = new Activity();
      activity1.activityDuration = { time: '00:20:00'};
      activity2.activityDuration = { time: '00:21:00'};
      activity3.activityDuration = { time: '00:20:01'};

      calendarDays.push(new CalendarDay(null, Array.of(activity1)),
        new CalendarDay(null, Array.of(activity2)),
        new CalendarDay(null, Array.of(activity3)));
      const result = calendarViewComponent.getTimeForRow(calendarDays);
      expect(result).toBe('01:01:01');
    }));

   it('should calculate the time for a row where the total is 1 hour',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const calendarDays: CalendarDay[] = [];
      const activity1: Activity = new Activity();
      const activity2: Activity = new Activity();
      const activity3: Activity = new Activity();
      activity1.activityDuration = { time: '00:20:00'};
      activity2.activityDuration = { time: '00:20:00'};
      activity3.activityDuration = { time: '00:20:00'};

      calendarDays.push(new CalendarDay(null, Array.of(activity1)),
        new CalendarDay(null, Array.of(activity2)),
        new CalendarDay(null, Array.of(activity3)));
      const result = calendarViewComponent.getTimeForRow(calendarDays);
      expect(result).toBe('01:00:00');
    }));


   it('should calculate the distance for the current month',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const activity1: Activity = Activity.fromDateAndDistance(5.3, '2020-02-28');
      const activity2: Activity = Activity.fromDateAndDistance(6.2, '2020-03-01');
      const activity3: Activity = Activity.fromDateAndDistance(7.1, '2020-03-31');
      const activities: Activity[]  = [];
      activities.push(activity1, activity2, activity3);
      const activityService = getTestBed().inject(ActivityService);
      spy = spyOn(activityService, 'getActivitiesForDateRange').and.returnValue(activities);
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
      const activity1: Activity = Activity.fromDateAndDistance(5.3, '2020-02-28');
      const activity2: Activity = Activity.fromDateAndDistance(6.2, '2020-03-01');
      const activity3: Activity = Activity.fromDateAndDistance(7.1, '2020-03-31');

      const activities: Activity[]  = [];
      activities.push(activity1, activity2, activity3);
      const activityService = getTestBed().inject(ActivityService);
      spy = spyOn(activityService, 'getActivitiesForDateRange').and.returnValue(activities);
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



   it('should handle two activities on the same day',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const activity1: Activity = Activity.fromDateAndDistance(5.3, '2020-02-28');
      const activity2: Activity = Activity.fromDateAndDistance(6.2, '2020-03-01');
      const activity3: Activity = Activity.fromDateAndDistance(7.1, '2020-03-31');
      const activity4: Activity = Activity.fromDateAndDistance(1.5, '2020-03-31');
      const activities: Activity[]  = [];
      activities.push(activity1, activity2, activity3, activity4);
      const activityService = getTestBed().inject(ActivityService);
      spy = spyOn(activityService, 'getActivitiesForDateRange').and.returnValue(activities);
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
