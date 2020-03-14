import { TestBed } from '@angular/core/testing';

import { RunServiceService } from './run.service';

describe('RunServiceService', () => {
  let service: RunServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
