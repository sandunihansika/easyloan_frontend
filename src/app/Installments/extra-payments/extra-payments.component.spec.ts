import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPaymentsComponent } from './extra-payments.component';

describe('ExtraPaymentsComponent', () => {
  let component: ExtraPaymentsComponent;
  let fixture: ComponentFixture<ExtraPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
