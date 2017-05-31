import { TestBed, inject } from '@angular/core/testing';

import { DeveloperSettingsService } from './developer-settings.service';

describe('DeveloperSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeveloperSettingsService]
    });
  });

  it('should ...', inject([DeveloperSettingsService], (service: DeveloperSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
