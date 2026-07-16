import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationTab } from './specification-tab';

describe('SpecificationTab', () => {
  let component: SpecificationTab;
  let fixture: ComponentFixture<SpecificationTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificationTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
