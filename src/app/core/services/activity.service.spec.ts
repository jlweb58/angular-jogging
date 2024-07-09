import {TestBed, async, getTestBed, inject, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {ActivityService} from './activity.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Activity} from '../models/activity.model';
import {LoggerService} from './logger.service';

describe('RunService', () => {

  const run1: Activity = new Activity();
  const run2: Activity = new Activity();
  const run3: Activity = new Activity();
  const runs: Activity[] = [ run1, run2, run3 ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService, LoggerService],
    });
  });

  it('should be initialized', inject([ActivityService], (runService: ActivityService) => {
    expect(runService).toBeTruthy();
  }));

  it('should return runs', inject([HttpTestingController, ActivityService], (httpMock: HttpTestingController, runService: ActivityService) => {
    runService.loadAll();
    const req = httpMock.expectOne('http://localhost:9000/jogging/runs');
    expect(req.request.method).toBe('GET');
    run1.date = '2020-05-31';
    run2.date = '2020-05-03';
    run3.date = '2020-04-19';
    req.flush(runs);

    runService.getActivities().subscribe(results => {
      if (!results) { return; }
      expect(results.length).toBe(3);
      });
  }));


  it('should fetch runs for date range',
    inject([HttpTestingController, ActivityService], async (httpMock: HttpTestingController, runService: ActivityService) => {
      runService.loadAll();
      const req = httpMock.expectOne('http://localhost:9000/jogging/runs');
      expect(req.request.method).toBe('GET');
      run1.date = '2020-05-31';
      run2.date = '2020-05-03';
      run3.date = '2020-04-19';
      req.flush(runs);
      const result: Activity[] = runService.getActivitiesForDateRange(new Date('2020-05-01T00:00:00Z'), new Date('2020-05-31T00:00:00Z'));

      expect(result.length).toBe(2);
      httpMock.verify();
    }));

  it('should include runs on the edge of the date range',
    inject([HttpTestingController, ActivityService], async (httpMock: HttpTestingController, runService: ActivityService) => {
      runService.loadAll();
      const req = httpMock.expectOne('http://localhost:9000/jogging/runs');
      expect(req.request.method).toBe('GET');
      run1.date = '2020-05-31';
      run2.date = '2020-05-03';
      run3.date = '2020-05-01';
      req.flush(runs);
      const result: Activity[] = runService.getActivitiesForDateRange(new Date('2020-05-01T00:00:00Z'), new Date('2020-05-31T00:00:00Z'));
      expect(result.length).toBe(3);
      httpMock.verify();
    }));
});
