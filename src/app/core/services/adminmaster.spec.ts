import { TestBed } from '@angular/core/testing';

import { Adminmaster } from './adminmaster';

describe('Adminmaster', () => {
  let service: Adminmaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminmaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
