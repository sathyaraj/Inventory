import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Documentslist } from './documentslist';

describe('Documentslist', () => {
  let component: Documentslist;
  let fixture: ComponentFixture<Documentslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Documentslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Documentslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
