import { TestBed } from '@angular/core/testing';

import { ApiInterceptorService } from './apiinterceptor.service';

describe('ApiinterceptorService', () => {
  let service: ApiInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
