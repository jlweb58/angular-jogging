import {async, inject, TestBed} from '@angular/core/testing';
import {StorageService} from './storage.service';
import {Activity} from '../models/activity.model';

describe('StorageService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      providers: [
        { provide: StorageService, useClass: StorageService },
      ]
    });
  }));

  afterEach(async( () => {
    sessionStorage.clear();
  }));

  it('should be initialized', inject([StorageService], (storageService: StorageService) => {
    expect(storageService).toBeTruthy();
  }));

  it('should return a stored activity',
    inject([StorageService], (storageService: StorageService) => {
      const activity = new Activity();
      activity.id = 13;
      storageService.putActivity(activity);
      const length = storageService.getAll().length;
      expect(length).toBe(1);
      const loadedActivity = storageService.getAll()[0];
      expect(loadedActivity.id).toBe(13);
    })
    );

  it('should store an activity list',
  inject( [StorageService], (storageService: StorageService) => {
    const activity1 = new Activity();
    const activity2 = new Activity();
    const activities = [];
    activity1.id = 13;
    activity2.id = 14;
    activities.push(activity1, activity2);
    storageService.putActivities(activities);
    const length = storageService.getAll().length;
    expect(length).toBe(2);
  }));
});
