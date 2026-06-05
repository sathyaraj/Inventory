import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTab } from './role-tab';

describe('RoleTab', () => {
  let component: RoleTab;
  let fixture: ComponentFixture<RoleTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
