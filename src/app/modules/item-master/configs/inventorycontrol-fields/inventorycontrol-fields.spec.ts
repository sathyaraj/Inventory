import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorycontrolFields } from './inventorycontrol-fields';

describe('InventorycontrolFields', () => {
  let component: InventorycontrolFields;
  let fixture: ComponentFixture<InventorycontrolFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventorycontrolFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorycontrolFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
