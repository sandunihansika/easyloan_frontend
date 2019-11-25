import { TestBed } from '@angular/core/testing';

import { AuthGroupService } from './auth-group.service';

describe('AuthGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGroupService = TestBed.get(AuthGroupService);
    expect(service).toBeTruthy();
  });
});
