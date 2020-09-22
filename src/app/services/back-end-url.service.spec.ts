import { TestBed } from '@angular/core/testing';

import { BackEndURLService } from './back-end-url.service';

describe('BackEndURLService', () => {
  let service: BackEndURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackEndURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
