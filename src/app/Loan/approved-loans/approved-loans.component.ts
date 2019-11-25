import { Component, OnInit } from '@angular/core';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-loans',
  templateUrl: './approved-loans.component.html',
  styleUrls: ['./approved-loans.component.css']
})
export class ApprovedLoansComponent implements OnInit {

  constructor(private authLoan:AuthLoanService,private authEmp:AuthenticationService,private toastr:ToastrManager,private router:Router) { }


  loanDetails={
    loan_no:0,
    authorized_by:0
  }
  type
  ApprovedList
  ngOnInit() {
    this.authLoan.getApprovedLoans().subscribe(
      (result)=>{
        this.ApprovedList=result
        console.log("approved"+this.ApprovedList)
      }
    )
    this.loanDetails.authorized_by=this.authEmp.getEmpDetails().employee_no
    this.type=this.authEmp.getEmpDetails().employee_type
  }

  authorizeLoan(loan){
    console.log('aputhorizing')
    this.loanDetails.loan_no=loan;
    this.authLoan.loanAuthorize(this.loanDetails).subscribe(
      (result)=>{
        if(result==200){
          this.toastr.successToastr('Loan Authorized','Success!',{position:'bottom-center'})
          this.reloadComponent()
        }
        else{
          this.toastr.errorToastr('','Error!',{position:'bottom-center'})
        }
      }
    )
    }
reverseApproval(loan){
  this.loanDetails.loan_no=loan;
  this.authLoan.reverseApproval(this.loanDetails).subscribe(
    (result)=>{
      if(result==200){
        this.toastr.successToastr('Riversed the Approval','Success!',{position:'bottom-center'})
        this.reloadComponent()
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
  this.router.navigate(['/nav/approved-loans']);
}

}
