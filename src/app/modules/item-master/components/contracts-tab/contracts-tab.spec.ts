import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsTab } from './contracts-tab';

describe('ContractsTab', () => {
  let component: ContractsTab;
  let fixture: ComponentFixture<ContractsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
