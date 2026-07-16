import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostinginformationFields } from './costinginformation-fields';

describe('CostinginformationFields', () => {
  let component: CostinginformationFields;
  let fixture: ComponentFixture<CostinginformationFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostinginformationFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostinginformationFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
