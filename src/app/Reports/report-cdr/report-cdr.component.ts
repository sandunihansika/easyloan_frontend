import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCustomerService } from 'src/app/Services/auth-customer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-cdr',
  templateUrl: './report-cdr.component.html',
  styleUrls: ['./report-cdr.component.css']
})
export class ReportCdrComponent implements OnInit {
  cusdetails = []
  searchText
  searchInput = ''
  filteredCustomerList = [];
  customerDetailsUI = [];
  filterValue = 1;
 
  constructor(private router: Router, private http:HttpClient, private authCus:AuthCustomerService) { }

  ngOnInit() {
    if(localStorage.getItem('empToken'))
    {
      this.authCus.allCustomer().subscribe(
        customers=>{
          this.cusdetails =customers;
          this.customerDetailsUI = customers;
          console.log(this.customerDetailsUI);
          
        }
     )
    }
    else{
     console.log('cannot display');
      this.router.navigateByUrl('/')
  }
  }

  onChange() {
    console.log(this.filterValue);
    if((this.filterValue) == 1) {
      this.filteredCustomerList = this.cusdetails;
      // if(this.searchInput == '' || this.searchInput == null) {
        
      // }
      console.log(this.filteredCustomerList);
      
      var matchData = []
      this.filteredCustomerList.forEach(data => {
        // console.log(data);
        var n = data.customer_id.toString().startsWith(this.searchInput)
        // console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      
      this.customerDetailsUI = matchData;
    } else {
      if(this.searchInput == '' || this.searchInput == null) {
        this.filteredCustomerList = this.cusdetails;
      }
      var matchData = []
      this.filteredCustomerList.forEach(data => {
        console.log(data);
        var n = data.nic_no.toString().startsWith(this.searchInput)
        console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      
      this.customerDetailsUI = matchData;
    }
  }

}
