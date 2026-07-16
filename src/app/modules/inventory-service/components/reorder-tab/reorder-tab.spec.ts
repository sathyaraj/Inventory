import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderTab } from './reorder-tab';

describe('ReorderTab', () => {
  let component: ReorderTab;
  let fixture: ComponentFixture<ReorderTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReorderTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReorderTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
