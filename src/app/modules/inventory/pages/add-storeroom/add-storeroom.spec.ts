import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreroom } from './add-storeroom';

describe('AddStoreroom', () => {
  let component: AddStoreroom;
  let fixture: ComponentFixture<AddStoreroom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStoreroom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoreroom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
