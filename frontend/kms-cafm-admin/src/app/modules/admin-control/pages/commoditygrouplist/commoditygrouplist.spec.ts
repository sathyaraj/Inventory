import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commoditygrouplist } from './commoditygrouplist';

describe('Commoditygrouplist', () => {
  let component: Commoditygrouplist;
  let fixture: ComponentFixture<Commoditygrouplist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commoditygrouplist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Commoditygrouplist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
