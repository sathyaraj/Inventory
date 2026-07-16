import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemKits } from './item-kits';

describe('ItemKits', () => {
  let component: ItemKits;
  let fixture: ComponentFixture<ItemKits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemKits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemKits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
