import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignmentModal } from './consignment-modal';

describe('ConsignmentModal', () => {
  let component: ConsignmentModal;
  let fixture: ComponentFixture<ConsignmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsignmentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsignmentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
