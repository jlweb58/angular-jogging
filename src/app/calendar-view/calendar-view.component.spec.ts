import {TestBed, async, inject} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {CalendarViewComponent} from './calendar-view.component';
import {RunService} from '../core/services/run.service';
import {LoggerService} from '../core/services/logger.service';
import {CalendarDay} from '../core/models/calendar.day';
import {Run} from '../core/models/run.model';

describe('CalendarViewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarViewComponent
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: CalendarViewComponent, useClass: CalendarViewComponent },
        { provide: LoggerService, useClass: LoggerService }
      ]
    }).compileComponents();
  }));

  it('should be initialized', inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
    expect(calendarViewComponent).toBeTruthy();
  }));

  it('should calculate the distance for a row',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
    const calendarDays: CalendarDay[] = [];
    const run1: Run = new Run();
    const run2: Run = new Run();
    const run3: Run = new Run();
    run1.distance = 5.2;
    run2.distance = 6.1;
    run3.distance = 11.8;
    calendarDays.push(new CalendarDay(null, run1), new CalendarDay(null, run2), new CalendarDay(null, run3));
    const result = calendarViewComponent.getDistanceForRow(calendarDays);
    expect(result).toBeCloseTo(23.1, 0.01);
    }));

  it('should calculate the time for a row',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const calendarDays: CalendarDay[] = [];
      const run1: Run = new Run();
      const run2: Run = new Run();
      const run3: Run = new Run();
      run1.runDuration = { time: '00:20:00'};
      run2.runDuration = { time: '00:21:00'};
      run3.runDuration = { time: '00:20:01'};

      calendarDays.push(new CalendarDay(null, run1), new CalendarDay(null, run2), new CalendarDay(null, run3));
      const result = calendarViewComponent.getTimeForRow(calendarDays);
      expect(result).toBe('01:01:01');
    }));

  it('should calculate the time for a row where the total is 1 hour',
    inject([CalendarViewComponent], (calendarViewComponent: CalendarViewComponent) => {
      const calendarDays: CalendarDay[] = [];
      const run1: Run = new Run();
      const run2: Run = new Run();
      const run3: Run = new Run();
      run1.runDuration = { time: '00:20:00'};
      run2.runDuration = { time: '00:20:00'};
      run3.runDuration = { time: '00:20:00'};

      calendarDays.push(new CalendarDay(null, run1), new CalendarDay(null, run2), new CalendarDay(null, run3));
      const result = calendarViewComponent.getTimeForRow(calendarDays);
      expect(result).toBe('01:00:00');
    }));

});