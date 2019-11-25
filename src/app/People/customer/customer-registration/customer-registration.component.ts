import { Component, OnInit } from '@angular/core';
import { AuthCustomerService, TokenPayload } from 'src/app/Services/auth-customer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  selectedFile=null;
  
  centernames
  centers
  customerForm

  manager=false
  admin=false
  cashier=false

  constructor(private auth:AuthCustomerService,private router:Router,private http:HttpClient,private authemp:AuthenticationService,private toastr:ToastrManager) { }
  

  onFileSelected(event){
    console.log(event);
    this.selectedFile=event.target.files[0];
  }

  
  credentials: TokenPayload= {
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
    if(localStorage.getItem('empToken')){
      this.auth.allCenters().subscribe(
        Allcenters=>{
          this.centers =Allcenters
          console.log("xx")
        }
     )
    }
    else{
      this.router.navigateByUrl("/")
    }
  
   
  }

 

  registerCustomer(){
    this.auth.registerCus(this.credentials).subscribe(
        (res)=>{
             if(res==404){
              this.toastr.errorToastr('Customer Already Existes','Failed!',{position:'bottom-center'})
             }

             else{
              this.toastr.successToastr('Sucessfully Registered','Sucess!',{position:'bottom-center'})
              this.router.navigateByUrl('nav/customer')
             }
            
        }
    )
    
    
    }

    reset(cusForm:NgForm){
     // console.log("hello reset");
      cusForm.reset();

    }

    
 

}
