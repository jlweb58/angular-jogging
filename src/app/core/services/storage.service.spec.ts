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

  it('should return a stored run',
    inject([StorageService], (storageService: StorageService) => {
      const run = new Activity();
      run.id = 13;
      storageService.putRun(run);
      const length = storageService.getAll().length;
      expect(length).toBe(1);
      const loadedRun = storageService.getAll()[0];
      expect(loadedRun.id).toBe(13);
    })
    );

  it('should store a run list',
  inject( [StorageService], (storageService: StorageService) => {
    const run1 = new Activity();
    const run2 = new Activity();
    const runs = [];
    run1.id = 13;
    run2.id = 14;
    runs.push(run1, run2);
    storageService.putRuns(runs);
    const length = storageService.getAll().length;
    expect(length).toBe(2);
  }));
});
