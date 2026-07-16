import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendorlist } from './vendorlist';

describe('Vendorlist', () => {
  let component: Vendorlist;
  let fixture: ComponentFixture<Vendorlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vendorlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vendorlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
