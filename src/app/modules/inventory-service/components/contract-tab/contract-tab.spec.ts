import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTab } from './contract-tab';

describe('ContractTab', () => {
  let component: ContractTab;
  let fixture: ComponentFixture<ContractTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
