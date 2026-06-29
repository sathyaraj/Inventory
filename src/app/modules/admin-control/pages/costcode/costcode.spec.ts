import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Costcode } from './costcode';

describe('Costcode', () => {
  let component: Costcode;
  let fixture: ComponentFixture<Costcode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Costcode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Costcode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
