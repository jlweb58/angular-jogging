import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderViewDayComponent } from './calender-view-day.component';

describe('CalenderViewDayComponent', () => {
  let component: CalenderViewDayComponent;
  let fixture: ComponentFixture<CalenderViewDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderViewDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderViewDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
