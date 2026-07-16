import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateTab } from './alternate-tab';

describe('AlternateTab', () => {
  let component: AlternateTab;
  let fixture: ComponentFixture<AlternateTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternateTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternateTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
