import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AuthenticationService} from './Services/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomerComponent } from './People/customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatCardModule, MatInputModule, MatStepperModule, MatMenuModule, MatTabsModule, MatSnackBarModule, MatSelectModule, MatDialogModule, MatProgressSpinnerModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { EmployeeComponent } from './People/employee/employee.component';
import { LoanEnterComponent } from './Loan/loan-enter/loan-enter.component';
import { CustomerRegistrationComponent } from './People/customer/customer-registration/customer-registration.component';
import { EmployeeRegistrationComponent } from './People/employee/employee-registration/employee-registration.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ToastrModule} from 'ng6-toastr-notifications';
import { ExtraPaymentsComponent } from './Installments/extra-payments/extra-payments.component';
import { RePaymentsComponent } from './Installments/re-payments/re-payments.component';
import { AppliedLoansComponent } from './Loan/applied-loans/applied-loans.component';
import { ApprovedLoansComponent } from './Loan/approved-loans/approved-loans.component';
import { AuthorizedLoansComponent } from './Loan/authorized-loans/authorized-loans.component';
import { CenterRegistrationComponent } from './Centers/center-registration/center-registration.component';
import { CenterEditComponent } from './Centers/center-edit/center-edit.component';
import { CenterGroupComponent } from './Centers/center-group/center-group.component';
import { ReportSettleComponent } from './Reports/report-settle/report-settle.component';
import { ReportCdrComponent } from './Reports/report-cdr/report-cdr.component';
import { ReportArComponent } from './Reports/report-ar/report-ar.component';
import { ReportDisburseComponent } from './Reports/report-disburse/report-disburse.component';
import { ReportLcrComponent } from './Reports/report-lcr/report-lcr.component';
import { ReportLdrComponent } from './Reports/report-ldr/report-ldr.component';
import { ReportLorComponent } from './Reports/report-lor/report-lor.component';
import { ReportLrComponent } from './Reports/report-lr/report-lr.component';
import { ReportMwrComponent } from './Reports/report-mwr/report-mwr.component';
import { ReportComponent } from './Reports/report/report.component';
import { BulkComponent } from './bulk/bulk.component';
// import { NgxUiLoaderModule } from  'ngx-ui-loader';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    CustomerComponent,
    MainNavigationComponent,
    EmployeeComponent,
    LoanEnterComponent,
    CustomerRegistrationComponent,
    EmployeeRegistrationComponent,
    UserProfileComponent,
    ExtraPaymentsComponent,
    RePaymentsComponent,
    AppliedLoansComponent,
    ApprovedLoansComponent,
    AuthorizedLoansComponent,
    CenterRegistrationComponent,
    CenterEditComponent,
    CenterGroupComponent,
    ReportSettleComponent,
    ReportCdrComponent,
    ReportArComponent,
    ReportDisburseComponent,
    ReportLcrComponent,
    ReportLdrComponent,
    ReportLorComponent,
    ReportLrComponent,
    ReportMwrComponent,
    ReportComponent,
    BulkComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    // NgxUiLoaderModule,
    MatInputModule,
    MatStepperModule,
    MatToolbarModule,  
    MatMenuModule,
    MatTabsModule,
   MatSnackBarModule,
   MatSelectModule,
   MatDialogModule,
   MatProgressSpinnerModule,
   MatFormFieldModule,
   ReactiveFormsModule,
   MatDatepickerModule, 
   MatNativeDateModule,
   Ng2SearchPipeModule,
   ToastrModule.forRoot()
   
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
