import { TestBed } from '@angular/core/testing';

import { AuthPaymentService } from './auth-payment.service';

describe('AuthPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthPaymentService = TestBed.get(AuthPaymentService);
    expect(service).toBeTruthy();
  });
});
