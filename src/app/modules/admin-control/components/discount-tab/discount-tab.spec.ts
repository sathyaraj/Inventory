import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountTab } from './discount-tab';

describe('DiscountTab', () => {
  let component: DiscountTab;
  let fixture: ComponentFixture<DiscountTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
