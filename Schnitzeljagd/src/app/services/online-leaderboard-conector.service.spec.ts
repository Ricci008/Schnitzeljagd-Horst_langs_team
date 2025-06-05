import { TestBed } from '@angular/core/testing';

import { OnlineLeaderboardConectorService } from './online-leaderboard-conector.service';

describe('OnlineLeaderboardConectorService', () => {
  let service: OnlineLeaderboardConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineLeaderboardConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
