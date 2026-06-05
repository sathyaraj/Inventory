import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFields } from './admin-fields';

describe('AdminFields', () => {
  let component: AdminFields;
  let fixture: ComponentFixture<AdminFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
