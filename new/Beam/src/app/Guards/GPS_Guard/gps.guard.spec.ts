import { TestBed, async, inject } from '@angular/core/testing';

import { GPSGuard } from './gps.guard';

describe('GPSGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GPSGuard]
    });
  });

  it('should ...', inject([GPSGuard], (guard: GPSGuard) => {
    expect(guard).toBeTruthy();
  }));
});
