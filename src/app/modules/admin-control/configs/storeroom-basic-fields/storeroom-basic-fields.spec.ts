import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreroomBasicFields } from './storeroom-basic-fields';

describe('StoreroomBasicFields', () => {
  let component: StoreroomBasicFields;
  let fixture: ComponentFixture<StoreroomBasicFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreroomBasicFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreroomBasicFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
