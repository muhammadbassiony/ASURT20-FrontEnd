import { TestBed } from '@angular/core/testing';

import { PhotoRollFetcherService } from './photo-roll-fetcher.service';

describe('PhotoRollService', () => {
  let service: PhotoRollFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoRollFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
