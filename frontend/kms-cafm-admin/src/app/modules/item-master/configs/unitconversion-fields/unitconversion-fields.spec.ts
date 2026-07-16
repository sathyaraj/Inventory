import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitconversionFields } from './unitconversion-fields';

describe('UnitconversionFields', () => {
  let component: UnitconversionFields;
  let fixture: ComponentFixture<UnitconversionFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitconversionFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitconversionFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
