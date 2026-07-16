import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceitemTab } from './serviceitem-tab';

describe('ServiceitemTab', () => {
  let component: ServiceitemTab;
  let fixture: ComponentFixture<ServiceitemTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceitemTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceitemTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
