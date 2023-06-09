import { TestBed } from '@angular/core/testing';

import { TmdbMoviesApiService } from './tmdb-movies-api.service';

describe('TmdbMoviesApiService', () => {
  let service: TmdbMoviesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbMoviesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
