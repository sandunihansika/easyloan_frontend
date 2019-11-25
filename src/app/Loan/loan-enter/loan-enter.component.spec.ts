import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEnterComponent } from './loan-enter.component';

describe('LoanEnterComponent', () => {
  let component: LoanEnterComponent;
  let fixture: ComponentFixture<LoanEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
