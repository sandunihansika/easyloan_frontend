import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RePaymentsComponent } from './re-payments.component';

describe('RePaymentsComponent', () => {
  let component: RePaymentsComponent;
  let fixture: ComponentFixture<RePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
