import { TestBed } from '@angular/core/testing';

import { TmdbTvApiService } from './tmdb-tv-api.service';

describe('TmdbTvApiService', () => {
  let service: TmdbTvApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbTvApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
