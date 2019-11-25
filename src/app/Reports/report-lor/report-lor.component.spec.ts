import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLorComponent } from './report-lor.component';

describe('ReportLorComponent', () => {
  let component: ReportLorComponent;
  let fixture: ComponentFixture<ReportLorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
