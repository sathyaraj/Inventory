import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetaxFields } from './servicetax-fields';

describe('ServicetaxFields', () => {
  let component: ServicetaxFields;
  let fixture: ComponentFixture<ServicetaxFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicetaxFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicetaxFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
