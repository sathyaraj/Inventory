import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCreate } from './unit-create';

describe('UnitCreate', () => {
  let component: UnitCreate;
  let fixture: ComponentFixture<UnitCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
