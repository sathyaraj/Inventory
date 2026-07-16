import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFields } from './subscription-fields';

describe('SubscriptionFields', () => {
  let component: SubscriptionFields;
  let fixture: ComponentFixture<SubscriptionFields>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionFields]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionFields);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
