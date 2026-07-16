import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoritemTab } from './vendoritem-tab';

describe('VendoritemTab', () => {
  let component: VendoritemTab;
  let fixture: ComponentFixture<VendoritemTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendoritemTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendoritemTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
