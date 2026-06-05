import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreroomModal } from './storeroom-modal';

describe('StoreroomModal', () => {
  let component: StoreroomModal;
  let fixture: ComponentFixture<StoreroomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreroomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreroomModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
