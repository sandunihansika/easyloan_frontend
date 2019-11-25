import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {Router} from '@angular/router';
import { AuthenticationService } from './authentication.service';




export interface CusDetails{
        customer_id:number,
        customer_name:string,
        nic_no:string,
        address:string,
        birthdate:string,
        gender:string,
        tp_no:string,
        occupation:string,
        center_no:number,
        guardian_name:string,
        guardian_address:string,
        guardian_nic:string,
        guardian_tp:string
}

interface TokenResponse{
  token:string
}

export interface TokenPayload{
        customer_id:number,
        customer_name:string,
        nic_no:string,
        address:string,
        birthdate:string,
        gender:string,
        tp_no:string,
        occupation:string,
        center_no:number,
        guardian_name:string,
        guardian_address:string,
        guardian_nic:string,
        guardian_tp:string
}



@Injectable({
  providedIn: 'root'
})
export class AuthCustomerService {
  private token:string

  constructor(private http:HttpClient,private router:Router,private auth:AuthenticationService){}
 

  

public registerCus(customer:TokenPayload):Observable<any>{

  console.log('hello Service working');
  return this.http.post(`http://localhost:3000/customers/cus_register`,customer)
}

public allCustomers():Observable<any>{
  console.log('calling customer details');
  return this.http.get(`http://localhost:3000/customers/get_cus`)
}

public cusCount():Observable<any>{
  return this.http.get(`http://localhost:3000/customers/cusCount`)
}

  
public allCenters():Observable<any>{
  console.log('calling all centers');
  return this.http.get(`http://localhost:3000/customers/get_all_centers`)

}

public editCus(customer:TokenPayload):Observable<any>{

  console.log('hello editing working');
  return this.http.post(`http://localhost:3000/customers/cus_edit`,customer)
}

public allCustomer():Observable<any>{
  return this.http.get(`http://localhost:3000/customers/get_center`)
}

}




