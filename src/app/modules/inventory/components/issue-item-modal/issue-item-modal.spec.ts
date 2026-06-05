import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueItemModal } from './issue-item-modal';

describe('IssueItemModal', () => {
  let component: IssueItemModal;
  let fixture: ComponentFixture<IssueItemModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueItemModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
