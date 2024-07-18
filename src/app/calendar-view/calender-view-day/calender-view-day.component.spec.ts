import { waitForAsync, ComponentFixture, getTestBed } from '@angular/core/testing';

import { CalenderViewDayComponent } from './calender-view-day.component';
import {CalendarDay} from '../../core/models/calendar.day';

describe('CalenderViewDayComponent', () => {
  let component: CalenderViewDayComponent;
  let fixture: ComponentFixture<CalenderViewDayComponent>;

  beforeEach(waitForAsync(() => {
    getTestBed().configureTestingModule({
      declarations: [ CalenderViewDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = getTestBed().createComponent(CalenderViewDayComponent);
    component = fixture.componentInstance;
    component.calendarDay = new CalendarDay(new Date("2024-03-01"), []);
    component.currentMonth = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
