import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferItem } from './transfer-item';

describe('TransferItem', () => {
  let component: TransferItem;
  let fixture: ComponentFixture<TransferItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
