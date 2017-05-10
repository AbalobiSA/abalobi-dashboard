import { TestBed, inject } from '@angular/core/testing';

import { FishersService } from './fishers.service';

describe('FishersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FishersService]
    });
  });

  it('should ...', inject([FishersService], (service: FishersService) => {
    expect(service).toBeTruthy();
  }));
});
