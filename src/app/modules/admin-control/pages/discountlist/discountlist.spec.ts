import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Discountlist } from './discountlist';

describe('Discountlist', () => {
  let component: Discountlist;
  let fixture: ComponentFixture<Discountlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Discountlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Discountlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
