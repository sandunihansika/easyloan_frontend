import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDisburseComponent } from './report-disburse.component';

describe('ReportDisburseComponent', () => {
  let component: ReportDisburseComponent;
  let fixture: ComponentFixture<ReportDisburseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDisburseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDisburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
