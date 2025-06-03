import { TestBed } from '@angular/core/testing';

import { ScavangerHuntManagerService } from './scavanger-hunt-manager.service';

describe('ScavangerHuntManagerService', () => {
  let service: ScavangerHuntManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScavangerHuntManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
