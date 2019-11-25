import { TestBed } from '@angular/core/testing';

import { AuthInstallmentService } from './auth-installment.service';

describe('AuthInstallmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInstallmentService = TestBed.get(AuthInstallmentService);
    expect(service).toBeTruthy();
  });
});
