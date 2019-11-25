import { TestBed } from '@angular/core/testing';

import { AuthCenterService } from './auth-center.service';

describe('AuthCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthCenterService = TestBed.get(AuthCenterService);
    expect(service).toBeTruthy();
  });
});
