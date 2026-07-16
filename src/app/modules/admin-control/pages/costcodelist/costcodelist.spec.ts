import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Costcodelist } from './costcodelist';

describe('Costcodelist', () => {
  let component: Costcodelist;
  let fixture: ComponentFixture<Costcodelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Costcodelist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Costcodelist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
