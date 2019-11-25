import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSettleComponent } from './report-settle.component';

describe('ReportSettleComponent', () => {
  let component: ReportSettleComponent;
  let fixture: ComponentFixture<ReportSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
