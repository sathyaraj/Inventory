import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyTab } from './assembly-tab';

describe('AssemblyTab', () => {
  let component: AssemblyTab;
  let fixture: ComponentFixture<AssemblyTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssemblyTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssemblyTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
