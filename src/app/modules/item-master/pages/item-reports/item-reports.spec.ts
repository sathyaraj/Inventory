import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReports } from './item-reports';

describe('ItemReports', () => {
  let component: ItemReports;
  let fixture: ComponentFixture<ItemReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
