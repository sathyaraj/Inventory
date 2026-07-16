import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTab } from './documents-tab';

describe('DocumentsTab', () => {
  let component: DocumentsTab;
  let fixture: ComponentFixture<DocumentsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
