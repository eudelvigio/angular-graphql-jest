import { TestBed } from '@angular/core/testing';

import { HumansWithCarsService } from './humans-with-cars.service';

describe('HumansWithCarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HumansWithCarsService = TestBed.get(HumansWithCarsService);
    expect(service).toBeTruthy();
  });
});
