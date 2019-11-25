import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpDetails, AuthenticationService, TokenPayLoad } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {



  details: EmpDetails


  constructor(private auth:AuthenticationService, private router:Router, private location:Location) {}

  ngOnInit() {
    this.details=this.auth.getEmpDetails();
  }

  logOut(){
    if(window.confirm("Do you want to logout")){
      this.auth.logout()
    }
  }

  home(){
    this.router.navigateByUrl('/nav')
  }

  back(){
    this.location.back();
  }
  
  profile(){
   this.router.navigateByUrl("nav/user-profile")
  }

}
