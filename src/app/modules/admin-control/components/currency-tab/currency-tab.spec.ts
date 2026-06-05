import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTab } from './currency-tab';

describe('CurrencyTab', () => {
  let component: CurrencyTab;
  let fixture: ComponentFixture<CurrencyTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
