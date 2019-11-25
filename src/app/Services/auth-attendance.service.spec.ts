import { TestBed } from '@angular/core/testing';

import { AuthAttendanceService } from './auth-attendance.service';

describe('AuthAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthAttendanceService = TestBed.get(AuthAttendanceService);
    expect(service).toBeTruthy();
  });
});
