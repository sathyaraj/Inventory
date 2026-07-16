import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstoreroomModal } from './addstoreroom-modal';

describe('AddstoreroomModal', () => {
  let component: AddstoreroomModal;
  let fixture: ComponentFixture<AddstoreroomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddstoreroomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstoreroomModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
