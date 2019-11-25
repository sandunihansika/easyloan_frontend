import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';

@Component({
  selector: 'app-report-lor',
  templateUrl: './report-lor.component.html',
  styleUrls: ['./report-lor.component.css']
})
export class ReportLorComponent implements OnInit {
  loandetails
  searchText

  constructor(private http:HttpClient, private router:Router, private authLoan:AuthLoanService) { }

  ngOnInit() {
    
    if(localStorage.getItem('empToken'))
        {
          this.authLoan.loanTotal().subscribe(
            employees=>{
              this.loandetails =employees
              console.log(this.loandetails)
            }
         )
    
        }
        else{
         console.log('cannot display');
          this.router.navigateByUrl('/')
      }
  }

}
