import { Component, OnInit } from '@angular/core';
import { AuthCustomerService, TokenPayload } from '../../Services/auth-customer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  view=false
  filteredCustomerList
  custdetails
  custdetailsUI
  searchInput
  filterValue
  selected=false
  ediRow:any=''
type

  
  
  constructor(private auth:AuthCustomerService,private router: Router, private http:HttpClient,private authemp:AuthenticationService,private toastr:ToastrManager) { }
  
   centers
    selectedCustomer:TokenPayload={
    customer_id:0,
    customer_name:'',
    nic_no:'',
    address:'',
    birthdate:'',
    gender:'',
    tp_no:'',
    occupation:'',
    center_no:0,
    guardian_name:'',
    guardian_address:'',
    guardian_nic:'',
    guardian_tp:''
    
      }; 
     
  ngOnInit() {
    if(localStorage.getItem('empToken'))
    {
     
      this.auth.allCustomers().subscribe(
        customers=>{
          this.custdetails =customers
          this.custdetailsUI=customers
          //console.log(this.custdetails )
        }
     )

    }
    else{
     console.log('cannot display');
    this.router.navigateByUrl('/')
  }
  console.log(this.selected);

  this.auth.allCenters().subscribe(
    Allcenters=>{
      this.centers =Allcenters
      console.log("xx")
    }
 )
this.type=this.authemp.getEmpDetails();


  }
  
 
  selected_id(select: any){
    console.log('I am working');
  this.selectedCustomer=select
  console.log(this.selected);
 
  }

  updateCustomer(){
    
    this.auth.editCus(this.selectedCustomer).subscribe(
        (res)=>{
          if(res==400){
             this.toastr.errorToastr('Loan Exists','Cannot Change the Center!',{position:'bottom-center'})
            
          }
          else if(res==401){
            this.toastr.errorToastr('Group Exists','Cannot Change the Center!',{position:'bottom-center'})
          }
          else{
            this.toastr.successToastr('Successfully Updated','Success!',{position:'bottom-center'})
            this.reloadComponent()
          }
           
        }
    )
    }


  viewCustomer(){
   this.view=true
  }
  updateVal(){
    this.selected=true
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/nav/customer']);
}

onChange() {
  console.log(this.filterValue);
  if(this.searchInput == '' || this.searchInput == null) {
    this.custdetailsUI = this.custdetails;
  }
  else{
    this.filteredCustomerList = this.custdetails;
    if((this.filterValue) == 1) {
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
      
      this.custdetailsUI= matchData;
    } else if((this.filterValue) == 2) {
      var matchData = []
      this.filteredCustomerList.forEach(data => {
        console.log(data);
        var n = data.nic_no.toString().startsWith(this.searchInput)
        console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      
      this.custdetailsUI = matchData;
    }

    else{
      var matchData = []
      this.filteredCustomerList.forEach(data => {
        console.log(data);
        var n = data.center_no.toString().startsWith(this.searchInput)
        console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      
      this.custdetailsUI = matchData;
    }
  }
  
}
  }

