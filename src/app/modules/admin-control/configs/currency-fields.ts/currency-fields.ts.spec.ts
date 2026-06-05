import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyFieldsTs } from './currency-fields.ts';

describe('CurrencyFieldsTs', () => {
  let component: CurrencyFieldsTs;
  let fixture: ComponentFixture<CurrencyFieldsTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyFieldsTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyFieldsTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
