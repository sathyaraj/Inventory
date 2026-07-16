import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcodeFields } from './costcode-fields';

describe('CostcodeFields', () => {
  let component: CostcodeFields;
  let fixture: ComponentFixture<CostcodeFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostcodeFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostcodeFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
