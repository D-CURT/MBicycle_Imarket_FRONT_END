import { TestBed } from '@angular/core/testing';

import { ProductGetterService } from './product-getter.service';

describe('ProductGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductGetterService = TestBed.get(ProductGetterService);
    expect(service).toBeTruthy();
  });
});
