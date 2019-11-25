import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


export interface CenterDetails{
  center_no:number,   
  center_name:string,
  location:string,
  center_leader:string,
  executive_id:number,
  group_no:number
  
      
      }
  
  interface TokenResponse{
      token:string
  }

  export interface CenterPayLoad{
  center_no:number   
  center_name:string
  location:string
  center_leader:string
  executive_id:number
  group_no:0
  
    }

    export interface Extragroup{
      group_no:number
      center_no:number
      }


@Injectable({
  providedIn: 'root'
})
export class AuthCenterService {

  constructor(private http:HttpClient,private auth:AuthenticationService) { }
  //charitha
  public getAllCenterDetals():Observable<any>{
    return this.http.get('http://localhost:3000/centers/');
  }

  /////////////////chathumini

  public allLoanDetails():Observable<any>{
    return this.http.get(`http://localhost:3000/centers/get_centerdetails`)
}

public allCustomerDetails():Observable<any>{
  return this.http.get(`http://localhost:3000/centers/get_customercenterdetails`)
}


public customerCount(cus_detail):Observable<any>
{
console.log('get group working');
return this.http.post(`http://localhost:3000/centers/get_countOfcustomers`,cus_detail)
}


public allCenterDetails():Observable<any>{
  return this.http.get(`http://localhost:3000/center_group/get_centergroupdetails`)
}

public getGroups(cNo){
  return this.http.post('http://localhost:3000/center_group/getGroupNo',cNo)
}

public loadMember(details){
  return this.http.post('http://localhost:3000/center_group/loadMembers',details)
}


public loadCount(details){
  return this.http.post('http://localhost:3000/center_group/loadCount',details)
}

public register(center:CenterPayLoad):Observable<any>{
  console.log('reg working');
return this.http.post(`http://localhost:3000/centers/register`,center)

}

public getCenterGroup(center_detail):Observable<any>
{
console.log('get group working');
return this.http.post(`http://localhost:3000/center_group/get_centergroupdetails`,center_detail)
}





public centerReport():Observable<any>{
  console.log('re working');
  return this.http.get(`http://localhost:3000/centers/get_centerdetailstoreport`)
}

public delete(x):Observable<any>
{
console.log('delete working');
return this.http.post(`http://localhost:3000/centers/delete_center`,x)
}


public update(y):Observable<any>
{
console.log('update working');
return this.http.post(`http://localhost:3000/centers/update_center`,y)
}




}
