import { Component, OnInit } from '@angular/core';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-loans',
  templateUrl: './applied-loans.component.html',
  styleUrls: ['./applied-loans.component.css']
})
export class AppliedLoansComponent implements OnInit {
  AppliedList
  type
  constructor(private authLoan:AuthLoanService,private authEmp:AuthenticationService,private toastr:ToastrManager,private router:Router) { }
  loanDetails={
    loan_no:0,
    approved_by:0
  }

  ngOnInit() {
    this.authLoan.getAppliedLoans().subscribe(
      (result)=>{
        this.AppliedList=result
        console.log("applied"+this.AppliedList)
      }
    )
    this.loanDetails.approved_by=this.authEmp.getEmpDetails().employee_no
    this.type=this.authEmp.getEmpDetails().employee_type
  }

  approveLoan(loan){
    console.log('aproving')
    this.loanDetails.loan_no=loan;
    this.authLoan.loanApprove(this.loanDetails).subscribe(
      (result)=>{
        if(result==200){
          this.toastr.successToastr('Approved the Authorization','Success!',{position:'bottom-center'})
          this.reloadComponent()
        }
        else{
          this.toastr.errorToastr('','Error!',{position:'bottom-center'})
        }
      }
    )
    }
  
    delete(loan){
      this.loanDetails.loan_no=loan;
      this.authLoan.deleteLoan(this.loanDetails).subscribe(
        (result)=>{
          if(result==200){
            this.toastr.successToastr('Loan Deleted','Success!',{position:'bottom-center'})
            this.reloadComponent();
          }
          else{
            this.toastr.errorToastr('','Error!',{position:'bottom-center'})
          }
        }
      )
    }

    reloadComponent() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/nav/applied-loans']);
  }
}
