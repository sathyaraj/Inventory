import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reorder } from './reorder';

describe('Reorder', () => {
  let component: Reorder;
  let fixture: ComponentFixture<Reorder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reorder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reorder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
