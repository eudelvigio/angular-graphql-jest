import { TestBed } from '@angular/core/testing';

import { HumanWithCarService } from './human-with-car.service';

describe('HumanWithCarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HumanWithCarService = TestBed.get(HumanWithCarService);
    expect(service).toBeTruthy();
  });
});
