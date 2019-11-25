import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoanService,LoanPayLoad } from '../../Services/auth-loan.service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-loan-enter',
  templateUrl: './loan-enter.component.html',
  styleUrls: ['./loan-enter.component.css']
})
export class LoanEnterComponent implements OnInit {
  idToSearch={
    customer_id:0
  };
credentials= {
  customer_id:0,
  loan_index:0,
  guarenter_id:0,
  due_start_date:''
  };

guaranter

  customerDetails=null
  loantypes
  constructor(private authLoan:AuthLoanService,private router:Router,private toastr:ToastrManager) { }

  ngOnInit() {
    if(localStorage.getItem('empToken')){
      this.authLoan.allLoanTypes().subscribe(
        (result)=>{
          this.loantypes=result
        }
      )
    }
    else{
      this.router.navigateByUrl("/")
    }
    
  }

  register(){
    //console.log("id is"+this.idToSearch.customer_id);
    this.credentials.customer_id=this.idToSearch.customer_id;
    
    //console.log("registering data"+this.credentials)
    // console.log("registering data"+this.credentials.customer_id)
    // console.log("registering data"+this.credentials.guarenter_id)
    // console.log("registering data"+this.credentials.loan_index)
    
    this.authLoan.register(this.credentials).subscribe(
        (res)=>{
          if(res==400){
            this.toastr.errorToastr('Customer already has an unsettled loan','Failed!',{position:'bottom-center'})
          }
          else{
            this.toastr.successToastr('Application saved','Successfull!',{position:'bottom-center'})
            this.router.navigateByUrl('/nav')
          }
           
        }
    )
    }

    guaranters(){
      this.authLoan.getGuaranter(this.idToSearch).subscribe(
        (grnt)=>{
              this.guaranter=grnt
              console.log(this.guaranter)
              //console.log("i am guaranter"+this.guaranter)
        }
      )
    }
 
    selectedIndex(index){
       this.credentials.loan_index=index
       console.log("i am type"+index)
    }

    selectedGuaranter(id){
      this.credentials.guarenter_id=id
      console.log("i am guaranter"+id)
   }

    search(){
    
      this.authLoan.getCustomerDetails(this.idToSearch).subscribe(
        (result)=>{
          if(result==400){
            this.toastr.warningToastr('Customer does not exist','Warning!',{position:'bottom-center'})
          }
          else if(result==401){
            this.toastr.warningToastr('Customer has no group','Warning!',{position:'bottom-center'})
          }
          else{
            this.customerDetails=result
            this.guaranters()
          }
        
        }
      )
    }

    reset(loanForm:NgForm){
      // console.log("hello reset");
       loanForm.reset();
 
     }
}
