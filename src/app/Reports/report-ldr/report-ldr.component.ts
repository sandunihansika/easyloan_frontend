import { Component, OnInit } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';

@Component({
  selector: 'app-report-ldr',
  templateUrl: './report-ldr.component.html',
  styleUrls: ['./report-ldr.component.css']
})
export class ReportLdrComponent implements OnInit {

  loandetails;
  initialLoanDetails;
  searchText1: number
  searchText2: number
  
  twoDate={
    fd:0,
    td:0
  }

  constructor(private http:HttpClient, private router:Router, private authLoan:AuthLoanService) { }

  ngOnInit() {
    if(localStorage.getItem('empToken'))
    {
      this.authLoan.loanDetails().subscribe(
        employees=>{
          this.loandetails = employees;
          this.initialLoanDetails = employees;
          console.log(this.loandetails)
        }
     )

    }
    else{
     console.log('cannot display');
      this.router.navigateByUrl('/')
  }
  }

  
  search(){
    this.twoDate.fd=this.searchText1
    this.twoDate.td=this.searchText2;

    var tempLoanDetails = [];

    // console.log(this.twoDate.fd+"to"+this.twoDate.td)
    // this.authLoan.dates(this.twoDate).subscribe((res)=>{
    //   console.log(res)
    //   this.loandetails=res
    // })
    console.log(this.initialLoanDetails);
    this.initialLoanDetails.forEach((detail) => {
      console.log(detail.loans);
      if(detail.loans.length != 0) {
        if(new Date(detail.loans[0].loan_date) >= new Date(this.searchText1) && new Date(detail.loans[0].loan_date) <= new Date(this.searchText2)) {
          tempLoanDetails.push(detail);
        }
      }
      
    })
    this.loandetails = tempLoanDetails;
    // console.log(this.loandetails);
  }

  back(){
    
          this.authLoan.loanDetails().subscribe(
            employees=>{
              this.loandetails =employees
              console.log(this.loandetails)
            }
         )
    
  }

}
