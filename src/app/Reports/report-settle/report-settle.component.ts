import { Component, OnInit } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'minimatch';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';

@Component({
  selector: 'app-report-settle',
  templateUrl: './report-settle.component.html',
  styleUrls: ['./report-settle.component.css']
})
export class ReportSettleComponent implements OnInit {
  loandetails = []
  searchText: number
  filteredloanList = [];
  loanDetailsUI = [];

  constructor(private router:Router, private authLoan:AuthLoanService) { }

  ngOnInit() {
    if(localStorage.getItem('empToken'))
        {
          this.authLoan.loanSet().subscribe(
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
      var n = data.settled_date.toString().startsWith(this.searchText)
      // console.log(n);
      if(n) {
        matchData.push(data)
      }
    })
    
    this.loanDetailsUI = matchData;
  }

  back(){
    
          this.authLoan.loanSet().subscribe(
            employees=>{
              this.loandetails=employees
              this.loanDetailsUI=employees
              console.log(this.loandetails)
            }
         )
    
       
    }


}
