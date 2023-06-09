import { TestBed } from '@angular/core/testing';

import { TmdbPersonsApiService } from './tmdb-persons-api.service';

describe('TmdbPersonsApiService', () => {
  let service: TmdbPersonsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbPersonsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
