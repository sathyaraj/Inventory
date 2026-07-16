import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTab } from './organization-tab';

describe('OrganizationTab', () => {
  let component: OrganizationTab;
  let fixture: ComponentFixture<OrganizationTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
