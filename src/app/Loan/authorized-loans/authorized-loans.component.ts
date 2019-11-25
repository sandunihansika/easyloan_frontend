import { Component, OnInit } from '@angular/core';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorized-loans',
  templateUrl: './authorized-loans.component.html',
  styleUrls: ['./authorized-loans.component.css']
})
export class AuthorizedLoansComponent implements OnInit {
  loanDetails={
    loan_no:0,
    disbursed_by:0
  }

  AuthorizedList
  type
  constructor(private authLoan:AuthLoanService,private authEmp:AuthenticationService,private toastr:ToastrManager,private router:Router) { }

  ngOnInit() {
    this.authLoan.getAuthorized().subscribe(
      (result)=>{
        this.AuthorizedList=result
        console.log("approved"+this.AuthorizedList)
      }
    )
    this.loanDetails.disbursed_by=this.authEmp.getEmpDetails().employee_no
    this.type=this.authEmp.getEmpDetails().employee_type
  }

  disburseLoan(loan){
    console.log('disbursing')
    this.loanDetails.loan_no=loan;
    this.authLoan.loandisburst(this.loanDetails).subscribe(
      (result)=>{
       if(result==200){
        this.toastr.successToastr('Loan Disbursed','Success!',{position:'bottom-center'})
        this.reloadComponent()
       }
       else{
        this.toastr.errorToastr('','Error!',{position:'bottom-center'})
       }
      }
    )
    }
    reverseAuthorize(loan){
      this.loanDetails.loan_no=loan;
      this.authLoan.reverseAuthorize(this.loanDetails).subscribe(
        (result)=>{
          if(result==200){
            this.toastr.successToastr('Riversed the Authorization','Success!',{position:'bottom-center'})
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
      this.router.navigate(['/nav/authorized-loans']);
    }
}
