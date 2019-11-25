import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterGroupComponent } from './center-group.component';

describe('CenterGroupComponent', () => {
  let component: CenterGroupComponent;
  let fixture: ComponentFixture<CenterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
