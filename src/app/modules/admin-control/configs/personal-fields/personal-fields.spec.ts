import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFields } from './personal-fields';

describe('PersonalFields', () => {
  let component: PersonalFields;
  let fixture: ComponentFixture<PersonalFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
