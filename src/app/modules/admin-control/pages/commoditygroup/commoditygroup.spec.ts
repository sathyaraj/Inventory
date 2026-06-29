import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commoditygroup } from './commoditygroup';

describe('Commoditygroup', () => {
  let component: Commoditygroup;
  let fixture: ComponentFixture<Commoditygroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commoditygroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Commoditygroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
