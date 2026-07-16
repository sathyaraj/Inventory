import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsFields } from './userdetails-fields';

describe('UserdetailsFields', () => {
  let component: UserdetailsFields;
  let fixture: ComponentFixture<UserdetailsFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdetailsFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdetailsFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
