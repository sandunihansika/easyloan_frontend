import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { AuthInstallmentService } from '../Services/auth-installment.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css']
})
export class BulkComponent implements OnInit {

  constructor(private authEmp:AuthenticationService,private router:Router,private authins:AuthInstallmentService) { }
executives
bulks
  ngOnInit() {
    if(localStorage.getItem('empToken')){
      this.authEmp.Allex().subscribe(
        Allex=>{
          this.executives =Allex
         
        }
     )
     this.authins.todayBulks().subscribe(
      bulks=>{
        this.bulks =bulks
       
      }
   )

    }
    else{
      this.router.navigateByUrl("/")
    }
  
  }

  credentials={
    cashier_no:0,
    executive_no:0,
    bulk_date:'',
    bulk_amount:0.0,
    bulk_state:''
  }
}
