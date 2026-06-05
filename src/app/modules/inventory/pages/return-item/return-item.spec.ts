import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnItem } from './return-item';

describe('ReturnItem', () => {
  let component: ReturnItem;
  let fixture: ComponentFixture<ReturnItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
