import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityFields } from './security-fields';

describe('SecurityFields', () => {
  let component: SecurityFields;
  let fixture: ComponentFixture<SecurityFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
