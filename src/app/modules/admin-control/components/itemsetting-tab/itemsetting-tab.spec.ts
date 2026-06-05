import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsettingTab } from './itemsetting-tab';

describe('ItemsettingTab', () => {
  let component: ItemsettingTab;
  let fixture: ComponentFixture<ItemsettingTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsettingTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsettingTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
