import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storeroom } from './storeroom';

describe('Storeroom', () => {
  let component: Storeroom;
  let fixture: ComponentFixture<Storeroom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storeroom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Storeroom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
