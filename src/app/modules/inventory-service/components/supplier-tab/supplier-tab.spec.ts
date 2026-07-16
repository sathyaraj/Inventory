import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTab } from './supplier-tab';

describe('SupplierTab', () => {
  let component: SupplierTab;
  let fixture: ComponentFixture<SupplierTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
