import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreroomContactFields } from './storeroom-contact-fields';

describe('StoreroomContactFields', () => {
  let component: StoreroomContactFields;
  let fixture: ComponentFixture<StoreroomContactFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreroomContactFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreroomContactFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
