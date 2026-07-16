import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFields } from './contact-fields';

describe('ContactFields', () => {
  let component: ContactFields;
  let fixture: ComponentFixture<ContactFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
