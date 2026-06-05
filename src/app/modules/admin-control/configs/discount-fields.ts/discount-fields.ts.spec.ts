import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountFieldsTs } from './discount-fields.ts';

describe('DiscountFieldsTs', () => {
  let component: DiscountFieldsTs;
  let fixture: ComponentFixture<DiscountFieldsTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountFieldsTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountFieldsTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
