import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicebasicFields } from './servicebasic-fields';

describe('ServicebasicFields', () => {
  let component: ServicebasicFields;
  let fixture: ComponentFixture<ServicebasicFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicebasicFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicebasicFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
