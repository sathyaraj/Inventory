import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnItemModal } from './return-item-modal';

describe('ReturnItemModal', () => {
  let component: ReturnItemModal;
  let fixture: ComponentFixture<ReturnItemModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnItemModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnItemModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
