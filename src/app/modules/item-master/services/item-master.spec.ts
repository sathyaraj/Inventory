import { TestBed } from '@angular/core/testing';

import { ItemMaster } from './item-master';

describe('ItemMaster', () => {
  let service: ItemMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
