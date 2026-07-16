import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceconfigFields } from './serviceconfig-fields';

describe('ServiceconfigFields', () => {
  let component: ServiceconfigFields;
  let fixture: ComponentFixture<ServiceconfigFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceconfigFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceconfigFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
