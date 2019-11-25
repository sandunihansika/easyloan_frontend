import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomerComponent } from './People/customer/customer.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './People/employee/employee.component';
import { LoanEnterComponent } from './Loan/loan-enter/loan-enter.component';
import { CustomerRegistrationComponent } from './People/customer/customer-registration/customer-registration.component';
import { EmployeeRegistrationComponent } from './People/employee/employee-registration/employee-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ExtraPaymentsComponent } from './Installments/extra-payments/extra-payments.component';
import { RePaymentsComponent } from './Installments/re-payments/re-payments.component'
import { AppliedLoansComponent } from './Loan/applied-loans/applied-loans.component';
import { AuthorizedLoansComponent } from './Loan/authorized-loans/authorized-loans.component';
import { ApprovedLoansComponent } from './Loan/approved-loans/approved-loans.component';
import { CenterRegistrationComponent } from './Centers/center-registration/center-registration.component';
import { CenterEditComponent } from './Centers/center-edit/center-edit.component';
import { CenterGroupComponent } from './Centers/center-group/center-group.component';
import { ReportLrComponent } from './Reports/report-lr/report-lr.component';
import { ReportLdrComponent } from './Reports/report-ldr/report-ldr.component';
import { ReportLorComponent } from './Reports/report-lor/report-lor.component';
import { ReportMwrComponent } from './Reports/report-mwr/report-mwr.component';
import { ReportCdrComponent } from './Reports/report-cdr/report-cdr.component';
import { ReportLcrComponent } from './Reports/report-lcr/report-lcr.component';
import { ReportDisburseComponent } from './Reports/report-disburse/report-disburse.component';
import { ReportSettleComponent } from './Reports/report-settle/report-settle.component';
import { ReportArComponent } from './Reports/report-ar/report-ar.component';
import { ReportComponent } from './Reports/report/report.component';
import { BulkComponent } from './bulk/bulk.component';



const routes: Routes = [
 {
  path: 'nav',
  component: MainNavigationComponent,
  children: [
    {
      path:'',
      component:HomeComponent
    },
    {
    path:'customer',
    component:CustomerComponent
    },{
      path:'employee',
      component:EmployeeComponent
    },
    {
    path:'customer-register',
    component:CustomerRegistrationComponent
    },
    {
    path:'employee-register',
    component:EmployeeRegistrationComponent
    },{
      path:'user-profile',
      component:UserProfileComponent
    },{
      path:'loan-enter',
      component:LoanEnterComponent
    },{
      path:'applied-loans',
      component:AppliedLoansComponent
    },{
      path:'authorized-loans',
      component:AuthorizedLoansComponent
    },{
      path:'approved-loans',
      component:ApprovedLoansComponent
    },{
      path:'create-center',
      component:CenterRegistrationComponent
    },{
      path:'edit-center',
      component:CenterEditComponent
    },{
      path:'assign-group',
      component:CenterGroupComponent
    },{
      path:'report-lr',
      component:ReportLrComponent
    },{
      path:'report-ldr',
      component:ReportLdrComponent
    },{
      path:'report-lor',
      component:ReportLorComponent
    },{
      path:'report-mwr',
      component:ReportMwrComponent
    },{
      path:'report-cdr',
      component:ReportCdrComponent
    },{
      path:'report-lcr',
      component:ReportLcrComponent
    },{
      path:'report-disburse',
      component:ReportDisburseComponent
    },{
      path:'report-settle',
      component:ReportSettleComponent
    },{
      path:'report-ar',
      component:ReportArComponent
    },{
      path:'report',
      component:ReportComponent
    }, {
      path:'extra-payment',
      component:ExtraPaymentsComponent
    },
    {
      path:'re-payment',
      component:RePaymentsComponent
    },{
      path:'bulk',
      component:BulkComponent
    }
  ]
 } ,
  {
  path:'',
  component:LoginComponent
},
{
  path:'cashiernav',
  component:NavigationComponent
},{
  path:'loan-enter',
  component:LoanEnterComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
