import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMwrComponent } from './report-mwr.component';

describe('ReportMwrComponent', () => {
  let component: ReportMwrComponent;
  let fixture: ComponentFixture<ReportMwrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMwrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMwrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
