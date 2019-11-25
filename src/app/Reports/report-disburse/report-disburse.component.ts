import { Component, OnInit } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';

@Component({
  selector: 'app-report-disburse',
  templateUrl: './report-disburse.component.html',
  styleUrls: ['./report-disburse.component.css']
})
export class ReportDisburseComponent implements OnInit {
  loandetails = []
  searchText: number
  filteredloanList = [];
  loanDetailsUI = [];
  
  constructor(private router:Router, private authLoan:AuthLoanService) { }

  ngOnInit() {
    if(localStorage.getItem('empToken'))
        {
          this.authLoan.loanDis().subscribe(
            employees=>{
              this.loandetails=employees
              this.loanDetailsUI=employees
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
    console.log("kk"+this.searchText)
    
    this.filteredloanList = this.loandetails;
    console.log(this.filteredloanList);
    
    var matchData = []
    this.filteredloanList.forEach(data => {
      // console.log(data);
      var n = data.disbursed_date.toString().startsWith(this.searchText)
      // console.log(n);
      if(n) {
        matchData.push(data)
      }
    })
    
    this.loanDetailsUI = matchData;
  }

  back(){
            this.authLoan.loanDis().subscribe(
            employees=>{
              this.loandetails=employees
              this.loanDetailsUI=employees
              console.log(this.loandetails)
            }
         )
    
       
  }

}
