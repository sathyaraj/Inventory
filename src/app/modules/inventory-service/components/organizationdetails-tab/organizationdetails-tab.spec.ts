import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationdetailsTab } from './organizationdetails-tab';

describe('OrganizationdetailsTab', () => {
  let component: OrganizationdetailsTab;
  let fixture: ComponentFixture<OrganizationdetailsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationdetailsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationdetailsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
