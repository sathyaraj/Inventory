import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFields } from './company-fields';

describe('CompanyFields', () => {
  let component: CompanyFields;
  let fixture: ComponentFixture<CompanyFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
