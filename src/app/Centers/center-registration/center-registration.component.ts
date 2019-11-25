import { Component, OnInit } from '@angular/core';
import { CenterPayLoad, AuthCenterService } from 'src/app/Services/auth-center.service';
import { AuthGroupService } from 'src/app/Services/auth-group.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-center-registration',
  templateUrl: './center-registration.component.html',
  styleUrls: ['./center-registration.component.css']
})
export class CenterRegistrationComponent implements OnInit {
  center_num
  extracenter_num
    centerss
  
  credentials:CenterPayLoad= {
    center_no:0,   
    center_name:'',
    location:'',
    center_leader:'',
    executive_id:0,
    group_no:0,
    }; 

    toggleBool: boolean=false;





  constructor(private authCenter:AuthCenterService, private auth:AuthGroupService,private router:Router,public toastr:ToastrManager) { }

 

  ngOnInit() {
    
  }
 
  register(){
    console.log('sending data works');
    //this.SaveGroup();
    this.authCenter.register(this.credentials).subscribe(
        (res)=>{
          console.log(res)
          console.log("before"+res.center_no)
            this.center_num=res.center_no
            console.log('after assigning'+this.center_num)
            this.SaveGroup();
            console.log('register is overrrrrrrrrrrr')
            if(res==404){
              this.toastr.warningToastr('Ececutive  does not exit','warning!',{
                position:'bottom-center'
              });
            }else{
              this.toastr.successToastr('Register suceesfully','Success!',{
                position:'bottom-center'
              });

            }
           //this.router.navigateByUrl('/')
              
        }

    ) 
    
   
}

/*done(){
  this.register();
  delay(500);
  //console.log(this.center_num);
    this.SaveGroup(); 
}*/
         
groups = {
  center_no:0,
  group_no: []
  
}

  SaveGroup() {
    
    console.log("group number is"+this.center_num); 
  
    if (this.groups.group_no.length == 0) {
    
      //window.alert("Groups must not be empty")
      
    } else {
      console.log("save working");
      //this.groups.center_no = this.auth.getGroupDetails().center_no;
       this.groups.center_no=this.center_num;
      
      this.auth.SaveGroup(this.groups).subscribe(
        result => {
          console.log(result)
         // console.log("hiii"+result.groups.group_no)
        }
      )
    }

  }

  
    AddGroup(e, type) {
      console.log(e+type);
      if (e.target.checked) {
        this.groups.group_no.push(type);
        this.toggleBool= true;
        console.log(this.toggleBool)
      } else {
        this.toggleBool= false;
        const index: number = this.groups.group_no.indexOf(type);
        if (index !== -1) {
          this.groups.group_no.splice(index, 1);
        }
      }
    }

   

reset(centerForm:NgForm){
  centerForm.reset();
  this.toggleBool= true;
  console.log('resettttttttttttttt')
}

reload(){
  this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
  this.router.onSameUrlNavigation='reload';
  this.router.navigate(['/nav/center']);
}





  


}
