import { TestBed } from '@angular/core/testing';

import { HttpWorksService } from './http-works.service';

describe('HttpWorksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpWorksService = TestBed.get(HttpWorksService);
    expect(service).toBeTruthy();
  });
});
