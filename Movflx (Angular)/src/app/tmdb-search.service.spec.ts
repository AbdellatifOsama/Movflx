import { TestBed } from '@angular/core/testing';

import { TmdbSearchService } from './tmdb-search.service';

describe('TmdbSearchService', () => {
  let service: TmdbSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
