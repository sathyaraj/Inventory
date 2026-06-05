import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roledetail } from './roledetail';

describe('Roledetail', () => {
  let component: Roledetail;
  let fixture: ComponentFixture<Roledetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roledetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roledetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
