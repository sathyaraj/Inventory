import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreroomCostFields } from './storeroom-cost-fields';

describe('StoreroomCostFields', () => {
  let component: StoreroomCostFields;
  let fixture: ComponentFixture<StoreroomCostFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreroomCostFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreroomCostFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
