import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthLoanService, LoanPayLoad } from 'src/app/Services/auth-loan.service';
import { AuthInstallmentService } from 'src/app/Services/auth-installment.service';

@Component({
  selector: 'app-report-lr',
  templateUrl: './report-lr.component.html',
  styleUrls: ['./report-lr.component.css']
})
export class ReportLrComponent implements OnInit {
  
  loandetails
  searchText 
  tableDataDummy;

  constructor(private http:HttpClient, private router:Router, private authLoan:AuthLoanService, private authInstallment: AuthInstallmentService) { }
  credentials={
    loan_no:0
  }

  ngOnInit() {
  }
  loanNo(){
    console.log(this.credentials)
    this.authLoan.loanNo(this.credentials).subscribe(
      (loan)=>{
        this.loandetails=loan
        console.log(loan)
      }
    )

    this.authInstallment.getInstallmentDetailsForReport(this.credentials).subscribe(installmentDetails => {
      console.log(installmentDetails);
      this.tableDataDummy = installmentDetails
    })

    console.log("display"+this.loandetails)
  }

}
