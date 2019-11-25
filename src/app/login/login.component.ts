import { Component, OnInit } from '@angular/core';
import {AuthenticationService,TokenPayLoad } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  credentials = {
    employee_no:0,
    employee_img:'',
    email_adress:'',
    e_password :'',
    password_hint:''
  }
  
  hint={ 
    email_adress:'',
    password_hint:'',
    employee_type:''
}

  public load = false;
  constructor(private auth: AuthenticationService, private router: Router,private toastr:ToastrManager) { }

  ngOnInit() {
this.hint.password_hint='Your Email Address is invalid'
  }

  login() {
    console.log('---');
    
    this.auth.login(this.credentials).subscribe(
      (res) => {
        if(res==401){
          this.toastr.errorToastr('Your Password is Incorrect','Failed!',{position:'top-center'})
        }
        else if(res==402){
          this.toastr.errorToastr('Executives cannot Login to the system','Failed!',{position:'top-center'})
        }
        else if(res==403){
          this.toastr.errorToastr('Employee Does not exists','Failed!',{position:'top-center'})
        }

        else{
          this.load=true;
          //cashiernav
          
            setTimeout( () => {  this.router.navigateByUrl('/nav') }, 1000);
          
          
        }
        
       
      }
    )
  }

  pwdHint(){
    console.log('calling hint')
    this.hint.password_hint='Invalid Email'
  this.hint.email_adress=this.credentials.email_adress
  this.auth.pwdint(this.hint).subscribe(
    (res)=>{
      if(res==400){
        this.hint.password_hint='Executives cannot login'
      }
      else{
        this.hint=res
      }
      
    }
  )
  }
  
  
}
