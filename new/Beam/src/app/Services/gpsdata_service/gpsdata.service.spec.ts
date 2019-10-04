import { TestBed } from '@angular/core/testing';

import { GpsdataService } from './gpsdata.service';

describe('GpsdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsdataService = TestBed.get(GpsdataService);
    expect(service).toBeTruthy();
  });
});
