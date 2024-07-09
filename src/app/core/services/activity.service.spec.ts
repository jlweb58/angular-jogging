import {TestBed, async, getTestBed, inject, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {ActivityService} from './activity.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Activity} from '../models/activity.model';
import {LoggerService} from './logger.service';

describe('ActivityService', () => {

  const activity1: Activity = new Activity();
  const activity2: Activity = new Activity();
  const activity3: Activity = new Activity();
  const activities: Activity[] = [ activity1, activity2, activity3 ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService, LoggerService],
    });
  });

  it('should be initialized', inject([ActivityService], (activityService: ActivityService) => {
    expect(activityService).toBeTruthy();
  }));

  it('should return activities', inject([HttpTestingController, ActivityService],
    (httpMock: HttpTestingController, activityService: ActivityService) => {
    activityService.loadAll();
    const req = httpMock.expectOne('http://localhost:9000/jogging/activities');
    expect(req.request.method).toBe('GET');
    activity1.date = '2020-05-31';
    activity2.date = '2020-05-03';
    activity3.date = '2020-04-19';
    req.flush(activities);

    activityService.getActivities().subscribe(results => {
      if (!results) { return; }
      expect(results.length).toBe(3);
      });
  }));


  it('should fetch activities for date range',
    inject([HttpTestingController, ActivityService], async (httpMock: HttpTestingController, activityService: ActivityService) => {
      activityService.loadAll();
      const req = httpMock.expectOne('http://localhost:9000/jogging/activities');
      expect(req.request.method).toBe('GET');
      activity1.date = '2020-05-31';
      activity2.date = '2020-05-03';
      activity3.date = '2020-04-19';
      req.flush(activities);
      const result: Activity[] = activityService.getActivitiesForDateRange(new Date('2020-05-01T00:00:00Z'),
        new Date('2020-05-31T00:00:00Z'));

      expect(result.length).toBe(2);
      httpMock.verify();
    }));

  it('should include activities on the edge of the date range',
    inject([HttpTestingController, ActivityService], async (httpMock: HttpTestingController, activityService: ActivityService) => {
      activityService.loadAll();
      const req = httpMock.expectOne('http://localhost:9000/jogging/activities');
      expect(req.request.method).toBe('GET');
      activity1.date = '2020-05-31';
      activity2.date = '2020-05-03';
      activity3.date = '2020-05-01';
      req.flush(activities);
      const result: Activity[] = activityService.getActivitiesForDateRange(new Date('2020-05-01T00:00:00Z'),
        new Date('2020-05-31T00:00:00Z'));
      expect(result.length).toBe(3);
      httpMock.verify();
    }));
});
