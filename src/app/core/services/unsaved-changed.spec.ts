import { TestBed } from '@angular/core/testing';

import { UnsavedChanged } from './unsaved-changed';

describe('UnsavedChanged', () => {
  let service: UnsavedChanged;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsavedChanged);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
