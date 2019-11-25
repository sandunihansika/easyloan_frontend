import { Component, OnInit } from '@angular/core';
import { Extragroup, AuthCenterService } from 'src/app/Services/auth-center.service';
import { AuthGroupService } from 'src/app/Services/auth-group.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-center-edit',
  templateUrl: './center-edit.component.html',
  styleUrls: ['./center-edit.component.css']
})
export class CenterEditComponent implements OnInit {
  centerredetails
  selectedcenter={
    center_no:0,
    center_name:'',
    location:'',
    center_leader_id:'',
    executive_id:0
  }
 /* updatecenter={
    center_no:0,
    center_name:'',
    location:'',
    center_leader_id:'',
    executive_id:0
  }*/
  edited

  credentialsgroup:Extragroup= {
    center_no:0,
    group_no:0
    };
  
    cusgroupchange={
      customer_id:0,
      group_no:0
      };
    

  constructor(private authCenter:AuthCenterService, private auth:AuthGroupService,private router:Router,public toastr:ToastrManager) { }
 
  ngOnInit() {
    if(localStorage.getItem('empToken'))
    {
      this.authCenter.centerReport().subscribe(
        center=>{
          this.centerredetails=center
      
        }
        
     )

    }
    else{
     console.log('cannot display');
      this.router.navigateByUrl('/')
  }
  }

  registerextragroup(){
    console.log('sending extra works');
    //this.SaveGroup();
    this.auth.registerextragroup(this.credentialsgroup).subscribe(
        (res)=>{
          console.log(res)
          console.log("before"+res.center_no)
          if(res == 200) {
            this.toastr.successToastr('Register suceesfully','Success!',{
              position:'bottom-center'
            });
          }  else {
            this.toastr.warningToastr("Sorry!..Cannot register",'Warning!',{
              position:'bottom-center'
            });
          }
            
              
        }

    ) 
    
   
}

updatecusgroup(){

  this.auth.updatecusgroup(this.cusgroupchange).subscribe(
    (res)=>{
      console.log(res)
      console.log("before"+res.center_no)
      if(res == 200) {
        this.toastr.successToastr('Update Successfully','Success!',{
          position:'bottom-center'
        });
      } else if(res == 402) {
        this.toastr.warningToastr("Group has maximum limit 5",'Warning!',{
          position:'bottom-center'
        });
        
      } else if(res==408) {
        this.toastr.errorToastr('Group does not exsist','Error!',{
          position:'bottom-center'
        });
        
      }else if(res==400){
        this.toastr.errorToastr('Cannot change!Customer has a loan','Sorry!',{
          position:'bottom-center'
        });

      }
        
          
    }

) 





}



delete(id){
this.selectedcenter.center_no=id
console.log("mmmmmmmmmmmm"+this.selectedcenter.center_no)
this.authCenter.delete(this.selectedcenter).subscribe(res=>{
  if(res == 200) {
    this.toastr.successToastr('Deleted suceesfully','Success!',{
      position:'bottom-center'
    });
  } else if(res == 404 || res == 405|| res == 300) {
    this.toastr.errorToastr('Error cannot delete...This center has customers','Error!',{
      position:'bottom-center'
    });
  }

})

}


edit(x){
  this.edited=true,
  this.selectedcenter=x
 


}

/////new updated

update(x){
  this.authCenter.update(this.selectedcenter).subscribe(res=>{
    if(res == 200) {
      this.toastr.successToastr('update suceesfully','Success!',{
        position:'bottom-center'
      });
    } else if(res == 505) {
      this.toastr.errorToastr('Executive does not exist','Error!Cannot update',{
        position:'bottom-center'
      });
    }else if(res==405){
      this.toastr.errorToastr('Center leader does not exist in that center','Error!Cannot update',{
        position:'bottom-center'
      });
    }else{
      this.toastr.errorToastr('Eroor occured','Error!Cannot update',{
        position:'bottom-center'
      });
    }
  
  })

}


reload(){
  this.edited=false
  if(localStorage.getItem('empToken'))
  {
    this.authCenter.centerReport().subscribe(
      center=>{
        this.centerredetails=center
    
      }
      
   )

  }
  else{
   console.log('cannot display');
    this.router.navigateByUrl('/')
}


}


reset(centereditForm:NgForm){
  centereditForm.reset();

  console.log('resettttttttttttttt')
}

/*reset(x){
  this.edited=true,
  this.selectedcenter=x

  console.log('resettttttttttttttt')
}*/

}
