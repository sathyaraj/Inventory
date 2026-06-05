import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storeroomcreate } from './storeroomcreate';

describe('Storeroomcreate', () => {
  let component: Storeroomcreate;
  let fixture: ComponentFixture<Storeroomcreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storeroomcreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Storeroomcreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
