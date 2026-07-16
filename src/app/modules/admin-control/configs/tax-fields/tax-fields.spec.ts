import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFields } from './tax-fields';

describe('TaxFields', () => {
  let component: TaxFields;
  let fixture: ComponentFixture<TaxFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
