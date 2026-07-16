import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFields } from './address-fields';

describe('AddressFields', () => {
  let component: AddressFields;
  let fixture: ComponentFixture<AddressFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
