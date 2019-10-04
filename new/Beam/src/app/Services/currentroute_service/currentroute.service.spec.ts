import { TestBed } from '@angular/core/testing';

import { CurrentrouteService } from './currentroute.service';

describe('CurrentrouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentrouteService = TestBed.get(CurrentrouteService);
    expect(service).toBeTruthy();
  });
});
