import { Component, OnInit } from '@angular/core';
import { AuthenticationService, EmpDetails } from '../Services/authentication.service';
import { Url } from 'url';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  pwdChange=false
  profileImage: File = null
  fileUrl: Url
  imgURL:any;
  imageForm: FormGroup;
  constructor(private auth:AuthenticationService,private router: Router,private toastr:ToastrManager) {
    this.imageForm = new FormGroup({
      image: new FormControl('', [Validators.required])
    })
   }
  
  
user:EmpDetails

sendingData={
  employee_no:0,
    employee_img:'',
    address:'',
    tp_no:'',
    email_adress:'',
    employee_type:'',
    epf_no:'',
    etf_no:'',
    e_password :'',
  new_password:'',
  new_hint:''
}
  ngOnInit() {
    if(localStorage.getItem('empToken')){
      this.user=this.auth.getEmpDetails()
      this.user.e_password='';
      this.user.password_hint='';
    }
  else{
    this.router.navigateByUrl("/")
  }
  }


  onFileSelected(event) {
    this.profileImage = <File>event.target.files[0]
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

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
   
}

  update(){
    this.sendingData.employee_no=this.user.employee_no;
    this.sendingData.employee_img=this.user.employee_img;
    this.sendingData.address=this.user.address;
    this.sendingData.tp_no=this.user.tp_no;
    this.sendingData.email_adress=this.user.email_adress;
    this.sendingData.employee_type=this.user.employee_type;
    this.sendingData.epf_no=this.user.epf_no;
    this.sendingData.etf_no=this.user.etf_no;
    this.sendingData.e_password=this.user.e_password
    this.auth.updateUser(this.sendingData).subscribe(res=>{
      if(this.profileImage!=null){
        const fd = new FormData()
        fd.append('profileImage', this.profileImage, this.profileImage.name)
        this.auth.updateUaerImage(fd).subscribe(ok => {
          if(res==400){
            this.toastr.errorToastr('Current Password is Incorrect','Failed!',{position:'bottom-center'})
          }
          else{
            this.toastr.successToastr('Successfully updated','Successfull!',{position:'bottom-center'})
            this.reloadComponent()
            this.router.navigateByUrl('/nav')
          }
        
        } )
      }
    else{
      if(res==400){
        this.toastr.errorToastr('Current Password is Incorrect','Failed!',{position:'bottom-center'})
      }
      else{
        this.toastr.successToastr('Successfully updated','Successfull!',{position:'bottom-center'})
        this.reloadComponent()
        this.router.navigateByUrl('/nav')
      }
    
    }
    })

}

back(){
  this.router.navigateByUrl('/nav')
}

changepwd(){
this.pwdChange=true
}

}