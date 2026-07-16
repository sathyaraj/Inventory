import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditygroupFields } from './commoditygroup-fields';

describe('CommoditygroupFields', () => {
  let component: CommoditygroupFields;
  let fixture: ComponentFixture<CommoditygroupFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommoditygroupFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommoditygroupFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
