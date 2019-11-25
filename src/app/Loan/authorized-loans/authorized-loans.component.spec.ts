import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedLoansComponent } from './authorized-loans.component';

describe('AuthorizedLoansComponent', () => {
  let component: AuthorizedLoansComponent;
  let fixture: ComponentFixture<AuthorizedLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizedLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
