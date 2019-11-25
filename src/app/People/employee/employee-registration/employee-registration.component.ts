import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService, TokenPayLoad, ExPayload, EmpDetails } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { Url } from 'url';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent implements OnInit {
  details: EmpDetails
  types=['Manager','Admin','Executive','Cashier']
  constructor(private auth:AuthenticationService,private router:Router, public toastr:ToastrManager) { }

  executiveData :ExPayload={
    employee_no: 0,
    bike_no:''
  }
  
  credentials: TokenPayLoad= {
    employee_no: 0,
    employee_name: '',
    employee_img:'',
    gender:'',
    birthdate:null,
    nic_no:'',
    address:'',
    tp_no:'',
    email_adress:'',
    employee_type:'',
    epf_no:'',
    etf_no:'',
    e_password :'',
    password_hint:'',
    
      }; 
  
  imageData={
    employee_no: 0,
    employee_img:''
  }
  profileImage: File = null
  fileUrl: Url
  imgURL:any;
  message
  ngOnInit() {
    if(!(localStorage.getItem('empToken'))){
      this.router.navigateByUrl("/")
    }
  }

  onFileSelected(event) {
    this.profileImage = <File>event.target.files[0]

    this.imageData.employee_no = this.credentials.employee_no
    this.imageData.employee_img = this.credentials.employee_img
    console.log(this.imageData) 
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var reader = new FileReader();
    this.profileImage = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  reset(empForm:NgForm){
     empForm.reset();

   }

   registerEmployee(){
    
    this.auth.registerEmp(this.credentials).subscribe(
        (res)=>{
          if(res==404){
            this.toastr.errorToastr('Employee Already Existes','Failed!',{position:'bottom-center'})
          }
            
           else{
              console.log("employee no is"+this.executiveData.employee_no)
            if(this.profileImage!=null){
              const fd = new FormData()
              fd.append('profileImage', this.profileImage, this.profileImage.name)
              console.log(fd)
              this.auth.uploadProfileImage(fd).subscribe(ok => {
                if(this.credentials.employee_type=='Executive'){
                  this.executiveData.employee_no=res.employee_no;
                  this.auth.regisierExecutive(this.executiveData).subscribe(
                    ()=>{
                      this.toastr.successToastr('Sucessfully Registered','Sucess!',{position:'bottom-center'})
                      this.router.navigateByUrl('nav/employee')
                    })
                  }
                else{
                  this.toastr.successToastr('Sucessfully Registered','Sucess!',{position:'bottom-center'})
                  this.router.navigateByUrl('nav/employee')
                }
                
                
              }
            )
            }
           else{
            if(this.credentials.employee_type=='Executive'){
              this.executiveData.employee_no=res.employee_no;
              this.auth.regisierExecutive(this.executiveData).subscribe(
                ()=>{
                  this.toastr.successToastr('Sucessfully Registered','Sucess!',{position:'bottom-center'})
                  this.router.navigateByUrl('nav/employee')
                })
            }
            else{
              
              this.toastr.successToastr('Sucessfully Registered','Sucess!',{position:'bottom-center'})
              this.router.navigateByUrl('nav/employee')
            }
           }
           
            }
           
            
           
        }
    )
    
    
    }

    

      
}
