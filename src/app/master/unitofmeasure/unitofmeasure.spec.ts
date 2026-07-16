import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unitofmeasure } from './unitofmeasure';

describe('Unitofmeasure', () => {
  let component: Unitofmeasure;
  let fixture: ComponentFixture<Unitofmeasure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unitofmeasure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unitofmeasure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
