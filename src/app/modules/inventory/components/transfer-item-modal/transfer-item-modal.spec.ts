import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferItemModal } from './transfer-item-modal';

describe('TransferItemModal', () => {
  let component: TransferItemModal;
  let fixture: ComponentFixture<TransferItemModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferItemModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferItemModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
