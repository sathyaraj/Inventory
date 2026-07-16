import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTab } from './tax-tab';

describe('TaxTab', () => {
  let component: TaxTab;
  let fixture: ComponentFixture<TaxTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
