import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecontrolFields } from './servicecontrol-fields';

describe('ServicecontrolFields', () => {
  let component: ServicecontrolFields;
  let fixture: ComponentFixture<ServicecontrolFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicecontrolFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicecontrolFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
