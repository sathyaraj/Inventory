import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Currencylist } from './currencylist';

describe('Currencylist', () => {
  let component: Currencylist;
  let fixture: ComponentFixture<Currencylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Currencylist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Currencylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
