import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItembasicFields } from './itembasic-fields';

describe('ItembasicFields', () => {
  let component: ItembasicFields;
  let fixture: ComponentFixture<ItembasicFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItembasicFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItembasicFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
