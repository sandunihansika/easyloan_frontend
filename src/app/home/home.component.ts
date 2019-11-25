import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { AuthCustomerService } from '../Services/auth-customer.service';
import { AuthLoanService } from '../Services/auth-loan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  now:number;
  
  constructor(private authEmp:AuthenticationService,private authCus:AuthCustomerService,private authLoan:AuthLoanService) { 
    
  }
  Employees
  Loans
  Customers
  type


  ngOnInit() {
    this.authEmp.empCount().subscribe(
      emp=>{
        this.Employees =emp
    
      }
   )

   this.authLoan.loanCount().subscribe(
    loan=>{
      this.Loans =loan
    console.log(this.Loans)
    }

 )

 this.authCus.cusCount().subscribe(
  cus=>{
    this.Customers=cus

  }
)


    this.type =this.authEmp.getEmpDetails();


    
  }

}
