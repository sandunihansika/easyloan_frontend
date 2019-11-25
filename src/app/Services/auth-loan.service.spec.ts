import { TestBed } from '@angular/core/testing';

import { AuthLoanService } from './auth-loan.service';

describe('AuthLoanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthLoanService = TestBed.get(AuthLoanService);
    expect(service).toBeTruthy();
  });
});
