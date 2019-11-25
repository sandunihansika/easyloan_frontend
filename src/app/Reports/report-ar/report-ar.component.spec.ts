import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportArComponent } from './report-ar.component';

describe('ReportArComponent', () => {
  let component: ReportArComponent;
  let fixture: ComponentFixture<ReportArComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportArComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportArComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
