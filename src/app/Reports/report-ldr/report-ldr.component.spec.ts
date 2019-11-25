import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLdrComponent } from './report-ldr.component';

describe('ReportLdrComponent', () => {
  let component: ReportLdrComponent;
  let fixture: ComponentFixture<ReportLdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
