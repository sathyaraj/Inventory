import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTab } from './vendor-tab';

describe('VendorTab', () => {
  let component: VendorTab;
  let fixture: ComponentFixture<VendorTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
