import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindynamicForm } from './admindynamic-form';

describe('AdmindynamicForm', () => {
  let component: AdmindynamicForm;
  let fixture: ComponentFixture<AdmindynamicForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmindynamicForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindynamicForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
