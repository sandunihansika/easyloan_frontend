import { Component, OnInit } from '@angular/core';
import { AuthCenterService } from 'src/app/Services/auth-center.service';
import { AuthGroupService } from 'src/app/Services/auth-group.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-center-group',
  templateUrl: './center-group.component.html',
  styleUrls: ['./center-group.component.css']
})
export class CenterGroupComponent implements OnInit {
  assignedCustomer
  customercenterdetails
  centergroupdetails
  counts
  membersDictionary = [];
  membersDictionaryUI= [];
  groupsDictionary=[];
  myData:any={};
  groupMembers
  groupCount
  selected={
  customer_id:0,
  center_no:0
  }
  centerD={
    cNo:0
  }
  loadDetails={
    center:0,
    group:0
  }
  Addgroup_no:any=[]

  groupNo
  
  credentials= {
  customer_id:0,
  //group_no:this.Addgroup_no
  group_no:0
 };

 centerGroup={
   center_no:0
 }

  selectedGroups

  searchText = ''
  searchText2 = ''
  filteredcustomer = [];
  filteredcustomerList = [];
  customercenterdetailsUI= [];
  tool
  toolgroup
  counted
  input
  backyy
  constructor(private authCenter:AuthCenterService, private auth:AuthGroupService,private router:Router,public toastr:ToastrManager) { }
  
  ngOnInit() {
    if(localStorage.getItem('empToken'))
    {
      this.authCenter.allCustomerDetails().subscribe(
        customercenter=>{
          this.customercenterdetails =customercenter
          this.customercenterdetailsUI=customercenter
        }
     )

    }
    else{
     console.log('cannot display');
      this.router.navigateByUrl('/')
  }



  /*if(localStorage.getItem('empToken'))
    {
      this.authCenter.allCenterDetails().subscribe(
        centergroup=>{
          this.centergroupdetails =centergroup
          //centergroup.center_no=this.center_nums
        }
     )

    }
    else{
     console.log('cannot display');
      this.router.navigateByUrl('/')
  }*/
  }

  selected_customer(id){
    this.assignedCustomer=id
  }

  register(inputVal:number,customerNo:number){
    //this.credentials.customer_id=this.assignedCustomer;
    //this.credentials.customer_id=this.customercenterdetailsUI.customer_id;
    this.credentials.customer_id=customerNo;
    this.credentials.group_no = inputVal;
    console.log("group is"+this.credentials.group_no);
    console.log("customer is"+this.credentials.customer_id);
  
    this.auth.register(this.credentials).subscribe(
        (res)=>{
          console.log(res)
          if(res == 200) {
            this.toastr.successToastr('Register suceesfully','Success!',{
              position:'bottom-center'
            });
          } else if(res == 404 || res == 403) {
            this.toastr.errorToastr('Group does not exsist','Error!',{
              position:'bottom-center'
            });
          } else if(res == 402) {
            this.toastr.warningToastr("Can't exceed limit 5",'Warning!',{
              position:'bottom-center'
            });
          }
          
            //this.router.navigateByUrl('/')
        },
        // err=>{
        //   window.alert(err.error.text)
        // }
    
    )
   }


selected_center(select){
  this.tool=true;
  this.toolgroup=true;
  this.input=true;
console.log("centerNo:"+select);
this.centerD.cNo=select
this.authCenter.getGroups(this.centerD).subscribe((res)=>{
  this.groupNo=res
  console.log(res)
  this.loadMembers();
  this.load();
  this.loadCount();
 // this.loadGroups();
  

})
}

//this.selected=select;
//this.credentials.customer_id=this.selected.customer_id;
//console.log("selected customer is"+this.credentials.customer_id)
//this.getCenterDetais();
loadMembers(){
  this.membersDictionary = [];
  this.loadDetails.center=this.centerD.cNo;
  this.authCenter.loadMember(this.loadDetails).subscribe((res)=>{
        console.log('members are'+res)
        this.groupMembers=res
        
        this.groupMembers.forEach((mem) => {
          var arrayMem = [];
          // console.log(this.membersDictionary);
          
          var status = this.membersDictionary.some(el => el.key == mem.group_no);
          if(!status) {
            this.groupMembers.forEach((member) => {  
              if(member.group_no == mem.group_no) {
                arrayMem.push(member.customer_id + "-" + member.customer_name);
              }
            })
            this.membersDictionary.push({
              key: mem.group_no,
              value: arrayMem
            });
            
          }
          
        })
        console.log(this.membersDictionary);
  });
}



load(){
  this.membersDictionaryUI = [];
  this.loadDetails.center=this.centerD.cNo;
  this.authCenter.loadMember(this.loadDetails).subscribe((res)=>{
        console.log('members are'+res)
        this.groupMembers=res
        
        this.groupMembers.forEach((mem) => {
          var arrayMem = [];
          // console.log(this.membersDictionary);
          
          var status = this.membersDictionaryUI.some(el => el.key == mem.group_no);
          if(!status) {
            this.groupMembers.forEach((member) => {  
              if(member.group_no == mem.group_no) {
                arrayMem.push(member.customer_id + "-" + member.customer_name);
              }
            })
            this.membersDictionaryUI.push({
              key: mem.group_no,
              value: arrayMem
            });
            
          }
          
        })
        console.log(this.membersDictionaryUI);
  });
}




/*getCenterDetais(){
    console.log('sending data works');
    //this.SaveGroup();
    this.authCenter.getCenterGroup(this.selected).subscribe(
      (res)=>{
          this.selectedGroups=res
          console.log(this.selectedGroups)

          this.centerGroup=this.selectedGroups;
        
        }


    ) 
  
}*/



loadCount(){
  this.groupsDictionary = [];
  this.loadDetails.center=this.centerD.cNo;
  this.authCenter.loadCount(this.loadDetails).subscribe((res)=>{
        console.log('counts are'+res)
        this.groupCount=res
        this.groupCount.forEach((gr) => {
          var arrayGroup = [];
          // console.log(this.membersDictionary);
          
          var status = this.groupsDictionary.some(el => el.key == gr.group_no);
          if(!status) {
            this.groupCount.forEach((group) => {  
              if(group.group_no == gr.group_no) {
                arrayGroup.push(group.Total_customres_amount);
              }
            })
            this.groupsDictionary.push({
              key: gr.group_no,
              value: arrayGroup
            });
          }
        })
        console.log(this.groupsDictionary);
  });
}

/*loadGroups(){
  this.loadDetails.center=this.centerD.cNo;
  this.authCenter.loadgroups(this.loadDetails).subscribe((res)=>{
       
  });

}*/

search(){
  console.log("kk"+this.searchText)
  
  this.filteredcustomerList = this.customercenterdetails;
  
  console.log(this.filteredcustomerList);
  
  var matchData = []
  this.filteredcustomerList.forEach(data => {
    // console.log(data);
    var n = data.customer_id.toString().startsWith(this.searchText)
    // console.log(n);
    if(n) {
      matchData.push(data)
    }
  })
  
  this.customercenterdetailsUI = matchData;
}

search2(){
  console.log("kk"+this.searchText2)
  
  this.filteredcustomer =this.membersDictionary;
  
  console.log(this.filteredcustomer);
  
  var matchData = []
  this.filteredcustomer.forEach(data => {
    // console.log(data);
    var n = data.value.toString().startsWith(this.searchText2)
    // console.log(n);
    if(n) {
      
      matchData.push(data)
    }
  })
  
  this.membersDictionaryUI= matchData;
  
}

back(){
this.tool=true
this.counted=false
  this.membersDictionaryUI = [];
  this.loadDetails.center=this.centerD.cNo;
  this.authCenter.loadMember(this.loadDetails).subscribe((res)=>{
        console.log('members are'+res)
        this.groupMembers=res
        
        this.groupMembers.forEach((mem) => {
          var arrayMem = [];
          // console.log(this.membersDictionary);
          
          var status = this.membersDictionaryUI.some(el => el.key == mem.group_no);
          if(!status) {
            this.groupMembers.forEach((member) => {  
              if(member.group_no == mem.group_no) {
                arrayMem.push(member.customer_id + "-" + member.customer_name);
              }
            })
            this.membersDictionaryUI.push({
              key: mem.group_no,
              value: arrayMem
            });
           
          }
          
        })
        console.log(this.membersDictionaryUI);
  });

}


count(){
  this.counted=true;
  this.tool=false;
  this.toolgroup=true;
}

reload(){
  this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
  this.router.onSameUrlNavigation='reload';
  this.router.navigate(['/nav/center-group']);
}


}
