import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storeroomlist } from './storeroomlist';

describe('Storeroomlist', () => {
  let component: Storeroomlist;
  let fixture: ComponentFixture<Storeroomlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storeroomlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Storeroomlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
