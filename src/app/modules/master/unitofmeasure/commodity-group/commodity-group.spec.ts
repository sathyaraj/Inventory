import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityGroup } from './commodity-group';

describe('CommodityGroup', () => {
  let component: CommodityGroup;
  let fixture: ComponentFixture<CommodityGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommodityGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommodityGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
