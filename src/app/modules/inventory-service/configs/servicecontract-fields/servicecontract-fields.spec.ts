import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecontractFields } from './servicecontract-fields';

describe('ServicecontractFields', () => {
  let component: ServicecontractFields;
  let fixture: ComponentFixture<ServicecontractFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicecontractFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicecontractFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
