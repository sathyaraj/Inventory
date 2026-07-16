import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreroomStatusFields } from './storeroom-status-fields';

describe('StoreroomStatusFields', () => {
  let component: StoreroomStatusFields;
  let fixture: ComponentFixture<StoreroomStatusFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreroomStatusFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreroomStatusFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
