import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFields } from './role-fields';

describe('RoleFields', () => {
  let component: RoleFields;
  let fixture: ComponentFixture<RoleFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
