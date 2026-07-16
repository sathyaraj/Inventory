import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditygroupTap } from './commoditygroup-tap';

describe('CommoditygroupTap', () => {
  let component: CommoditygroupTap;
  let fixture: ComponentFixture<CommoditygroupTap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommoditygroupTap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommoditygroupTap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
