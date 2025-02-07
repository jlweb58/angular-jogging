import {ComponentFixture, waitForAsync, getTestBed} from '@angular/core/testing';

import {ActivityViewComponent} from './activity-view.component';
import {MatDialog} from '@angular/material/dialog';
import {LoggerService} from '../../core/services/logger.service';
import {GpxTrackService} from '../../core/services/gpx-track.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Activity} from '../../core/models/activity.model';
import {GpxTrack} from '../../core/models/gpx-track.model';

describe('ActivityViewComponent', () => {
  let component: ActivityViewComponent;
  let fixture: ComponentFixture<ActivityViewComponent>;

  beforeEach(waitForAsync(() => {
    window.history.pushState({activity: {
      }}, '', '' );

    getTestBed().configureTestingModule({
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
    fixture = getTestBed().createComponent(ActivityViewComponent);
    component = fixture.componentInstance;
    component.activity = new Activity();
    component.gpxTrack = new GpxTrack();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
