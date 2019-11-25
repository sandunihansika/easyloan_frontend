import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLcrComponent } from './report-lcr.component';

describe('ReportLcrComponent', () => {
  let component: ReportLcrComponent;
  let fixture: ComponentFixture<ReportLcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
