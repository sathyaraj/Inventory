import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcodeTab } from './costcode-tab';

describe('CostcodeTab', () => {
  let component: CostcodeTab;
  let fixture: ComponentFixture<CostcodeTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostcodeTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostcodeTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
