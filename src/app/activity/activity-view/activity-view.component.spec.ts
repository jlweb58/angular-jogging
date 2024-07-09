import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityViewComponent} from './activity-view.component';
import {MatDialog} from '@angular/material/dialog';
import {LoggerService} from '../../core/services/logger.service';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RunViewComponent', () => {
  let component: ActivityViewComponent;
  let fixture: ComponentFixture<ActivityViewComponent>;

  beforeEach(async(() => {
    window.history.pushState({run: {
      runDuration: {

      }
      }}, '', '' );

    TestBed.configureTestingModule({
      declarations: [ ActivityViewComponent ],
      imports: [ HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: GpxTrackService, useClass: GpxTrackService },
        { provide: LoggerService, useClass: LoggerService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
