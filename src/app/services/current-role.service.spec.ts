import { TestBed } from '@angular/core/testing';

import { CurrentRoleService } from './current-role.service';

describe('CurrentRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentRoleService = TestBed.get(CurrentRoleService);
    expect(service).toBeTruthy();
  });
});
