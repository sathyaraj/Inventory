import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangestatusTab } from './changestatus-tab';

describe('ChangestatusTab', () => {
  let component: ChangestatusTab;
  let fixture: ComponentFixture<ChangestatusTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangestatusTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangestatusTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
