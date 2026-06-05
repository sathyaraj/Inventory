import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingItems } from './rotating-items';

describe('RotatingItems', () => {
  let component: RotatingItems;
  let fixture: ComponentFixture<RotatingItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotatingItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotatingItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
