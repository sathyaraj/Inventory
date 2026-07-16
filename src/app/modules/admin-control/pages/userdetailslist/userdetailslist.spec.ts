import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userdetailslist } from './userdetailslist';

describe('Userdetailslist', () => {
  let component: Userdetailslist;
  let fixture: ComponentFixture<Userdetailslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userdetailslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userdetailslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
