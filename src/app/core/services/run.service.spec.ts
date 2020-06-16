import {TestBed, async, getTestBed, inject, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {RunService} from './run.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Run} from '../models/run.model';
import {LoggerService} from './logger.service';
import {Type} from '@angular/core';
import {verify} from 'crypto';

describe('RunService', () => {

  const data = [
    {
      id: 1838,
      course: 'Buga 1x Berg',
      runDuration: {
        time: '01:21:02'
      },
      distance: 13.18,
      comments: 'Not bad. Started strong and easy, got a little tired.',
      weather: '15 pc',
      date: '2020-05-31',
      avgHeartRate: 132,
      shoes: {
        id: 9,
        name: 'Saucony Omni ISO',
        mileageOffset: 0.0,
        mileage: 0.0,
        active: true,
        preferred: true,
        new: false
      },
      new: false
    },
    {
      id: 1837,
      course: 'Buga 1x Berg',
      runDuration: {
        time: '01:21:20'
      },
      distance: 13.21,
      comments: 'Good',
      weather: '10 pc',
      date: '2020-05-03',
      avgHeartRate: 130,
      shoes: {
        id: 10,
        name: 'Brooks Adrenaline GTS 19',
        mileageOffset: 0.0,
        mileage: 0.0,
        active: true,
        preferred: false,
        new: false
      },
      new: false
    },
    {
      id: 1836,
      course: 'Buga 0x Berg',
      runDuration: {
        time: '01:09:41'
      },
      distance: 11.2,
      comments: 'Quite hard',
      weather: '16 sunny',
      date: '2020-04-19',
      avgHeartRate: 134,
      shoes: {
        id: 9,
        name: 'Saucony Omni ISO',
        mileageOffset: 0.0,
        mileage: 0.0,
        active: true,
        preferred: true,
        new: false
      },
      new: false
    }
  ];


  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RunService, LoggerService],
    });
  });

  it('should be initialized', inject([RunService], (runService: RunService) => {
    expect(runService).toBeTruthy();
  }));

  it('should fetch runs for date range',
    inject([HttpTestingController, RunService], async (httpMock: HttpTestingController, runService: RunService) => {
        const result: Run[] = await runService.getRunsForDateRange(new Date('2020-05-01T00:00:00Z'), new Date('2020-05-31T00:00:00Z'));
        const req = httpMock.expectOne('http://localhost:9000/jogging/runs');
        expect(req.request.method).toBe('GET');
        req.flush(data);
        console.log(result);
        expect(result.length).toBe(2);
        httpMock.verify();
      }));


});
