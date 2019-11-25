import { Component, OnInit } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';

@Component({
  selector: 'app-report-mwr',
  templateUrl: './report-mwr.component.html',
  styleUrls: ['./report-mwr.component.css']
})
export class ReportMwrComponent implements OnInit {
  loandetails = []
  searchText = ''
  filteredloanList = [];
  loanDetailsUI = [];
  constructor(private http:HttpClient, private router:Router, private authLoan:AuthLoanService) { }

  ngOnInit() {
    if(localStorage.getItem('empToken'))
    {
      this.authLoan.allLoanPay().subscribe(
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
    // if(this.searchInput == '' || this.searchInput == null) {
      
    // }
    console.log(this.filteredloanList);
    
    var matchData = []
    this.filteredloanList.forEach(data => {
      // console.log(data);
      var n = data.center_no.toString().startsWith(this.searchText)
      // console.log(n);
      if(n) {
        matchData.push(data)
      }
    })
    
    this.loanDetailsUI = matchData;
  }
  

}
