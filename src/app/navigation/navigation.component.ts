import { Component, OnInit } from '@angular/core';
import { AuthenticationService, EmpDetails } from '../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private auth:AuthenticationService,private router:Router) { }
details:EmpDetails
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

}
