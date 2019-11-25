import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayLoad, ExecutiveDetails } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Url } from 'url';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  type
  empdetails
  confirm=null
  edit=false
  view=false
  searchText
  imageForm: FormGroup;
  pwdChange=false
  empdetailsUI
  filterValue
  filteredEmpList
  
  constructor(private auth:AuthenticationService,private router: Router, private http:HttpClient,private toastr:ToastrManager) {
    this.imageForm = new FormGroup({
      image: new FormControl('', [Validators.required])
    })
  }
 selectedEmployee:TokenPayLoad={
  employee_no: 0,
  employee_name: '',
  employee_img:'',
  gender:'',
  birthdate:'',
  nic_no:'',
  address:'',
  tp_no:'',
  email_adress:'',
  employee_type:'',
  epf_no:'',
  etf_no:'',
  e_password :'',
  password_hint:''
 }

 sendingData={
  employee_no: 0,
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

 profileImage: File = null
 id: number
 fileUrl: Url
 imgURL:any;

 
 onFileSelected(event) {
  this.profileImage = <File>event.target.files[0]
}


 selectedExecutive:ExecutiveDetails={
  employee_no: 0,
  bike_no:''
 }



  ngOnInit() 
  {
    if(localStorage.getItem('empToken'))
    {
      this.auth.allEmployees().subscribe(
        employees=>{
          this.empdetails =employees
          this.empdetailsUI=employees
        }
     )

    }
    else{
     console.log('cannot display');
    this.router.navigateByUrl('/')
  }
  
  this.type=this.auth.getEmpDetails();
  }



  delete(id){
    console.log('id is'+id)
    this.selectedEmployee.employee_no=id
    console.log('id is'+this.selectedEmployee.employee_no)
    this.auth.delete(this.selectedEmployee).subscribe(res=>{
     if(res==400){
      this.toastr.errorToastr('Executive Already Assigned to a center','Failed!',{position:'bottom-center'})
     }
     else{
      this.toastr.successToastr('Successfully Deleted','Sucessfull!',{position:'bottom-center'})
      this.reloadComponent()
     }
     
    })
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/nav/employee']);
}

changepwd(){
this.pwdChange=true
}

editEmp(emp){
this.edit=true;
this.selectedEmployee=emp;
console.log(emp)
this.selectedEmployee=emp
this.selectedEmployee.e_password=''
this.selectedEmployee.password_hint=''
if(emp.employee_type=='Executive'){
  this.selectedExecutive.employee_no=this.selectedEmployee.employee_no
  this.auth.loadExecutive(this.selectedExecutive).subscribe(ex=>
    this.selectedExecutive=ex
     
)
}

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

update(){
    if(this.selectedEmployee.employee_type=='Executive'){

      if(this.selectedEmployee.e_password!=''){
        console.log('password changing')
        this.sendingData.employee_no=this.selectedEmployee.employee_no;
        this.sendingData.employee_img=this.selectedEmployee.employee_img;
        this.sendingData.address=this.selectedEmployee.address;
        this.sendingData.tp_no=this.selectedEmployee.tp_no;
        this.sendingData.email_adress=this.selectedEmployee.email_adress;
        this.sendingData.employee_type=this.selectedEmployee.employee_type;
        this.sendingData.epf_no=this.selectedEmployee.epf_no;
        this.sendingData.etf_no=this.selectedEmployee.etf_no;
        this.sendingData.e_password=this.selectedEmployee.e_password;
      
        this.auth.updateEmp(this.sendingData).subscribe(res=>{
          if(res==401){
            this.toastr.errorToastr('Current Password is Incorrect','Failed!',{position:'bottom-center'})
          }
          else{
            if(this.profileImage!=null){
              const fd = new FormData()
              fd.append('profileImage', this.profileImage, this.profileImage.name)
              this.auth.updateProfileImage(fd).subscribe(ok => {
                this.auth.updateBike(this.selectedExecutive).subscribe(res=>{
                  })
                  this.toastr.successToastr('Sucessfully Updated','Successfull!',{position:'bottom-center'})
                  this.reloadComponent()
              } )
            }
          else{
            this.auth.updateBike(this.selectedExecutive).subscribe(res=>{
              this.toastr.successToastr('Sucessfully Updated','Successfull!',{position:'bottom-center'})
              this.reloadComponent()
              })
              
          }
            
          }
          
         
        })
      }

      else{
        this.auth.updateEmp(this.selectedEmployee).subscribe(res=>{
          if(res==401){
            this.toastr.errorToastr('Current Password is Incorrect','Failed!',{position:'bottom-center'})
          }
          else{
            if(this.profileImage!=null){
              const fd = new FormData()
              fd.append('profileImage', this.profileImage, this.profileImage.name)
              this.auth.updateProfileImage(fd).subscribe(ok => {
                this.auth.updateBike(this.selectedExecutive).subscribe(res=>{
                  this.toastr.successToastr('Sucessfully Updated','Successfull!',{position:'bottom-center'})
                  this.reloadComponent()
                  })
                  
              } )
            }
          else{
            this.auth.updateBike(this.selectedExecutive).subscribe(res=>{
              this.toastr.successToastr('Sucessfully Updated','Successfull!',{position:'bottom-center'})
              this.reloadComponent()
              })
              
          }
            
          }
          
         
        })
      }
      
    }
    else{
      console.log('hiiiiiiiiii')
      this.auth.updateEmp(this.selectedEmployee).subscribe(res=>{
        if(this.profileImage!=null){
          const fd = new FormData()
          fd.append('profileImage', this.profileImage, this.profileImage.name)
          this.auth.updateProfileImage(fd).subscribe(ok => {
            this.toastr.successToastr('Sucessfully Updated','Successfull!',{position:'bottom-center'})
            window.location.reload()
          
          
          } )
        }

        else{
          this.toastr.successToastr('Sucessfully Updated','Successfull!',{position:'bottom-center'})
            this.reloadComponent()
        }
          
        
    }
    )
    }
   
}

viewEmp(emp){
console.log('viewing')
this.selectedEmployee=emp;
console.log(this.selectedEmployee)
if(emp.employee_type=='Executive'){
  this.selectedExecutive.employee_no=this.selectedEmployee.employee_no
  this.auth.loadExecutive(this.selectedExecutive).subscribe(ex=>
    this.selectedExecutive=ex
)
}

this.view=true

}

onChange() {
  console.log(this.filterValue);
  if(this.searchText == '' || this.searchText == null) {
    this.empdetailsUI = this.empdetails;
  }
  else{
    this.filteredEmpList = this.empdetails;
    if((this.filterValue) == 1) {
      console.log(this.filteredEmpList);
      
      var matchData = []
      this.filteredEmpList.forEach(data => {
        // console.log(data);
        var n = data.employee_no.toString().startsWith(this.searchText)
        // console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      
      this.empdetailsUI= matchData;
    } else {
      var matchData = []
      this.filteredEmpList.forEach(data => {
        console.log(data);
        var n = data.employee_type.toString().startsWith(this.searchText)
        console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      
      this.empdetailsUI = matchData;
    }
  }
  
}

}
