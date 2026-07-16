import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcontrolFields } from './itemcontrol-fields';

describe('ItemcontrolFields', () => {
  let component: ItemcontrolFields;
  let fixture: ComponentFixture<ItemcontrolFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemcontrolFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemcontrolFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
