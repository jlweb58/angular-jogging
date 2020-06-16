import {TestBed, async} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {CalendarViewComponent} from './calendar-view.component';
import {RunService} from '../core/services/run.service';
import {LoggerService} from '../core/services/logger.service';
import {Injectable} from '@angular/core';

describe('CalendarViewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarViewComponent
      ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: LoggerService, useClass: LoggerService }
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CalendarViewComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

});
