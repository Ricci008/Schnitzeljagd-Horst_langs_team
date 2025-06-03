import { TestBed } from '@angular/core/testing';

import { ScavangerHuntDataService } from './scavanger-hunt-data.service';

describe('ScavangerHuntDataService', () => {
  let service: ScavangerHuntDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScavangerHuntDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
