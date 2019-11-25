import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'




export interface GroupDetails {
  center_no: number
  group_no: number
  
}


export interface GroupPayLoad{
  group_no:number
  
  }

  export interface Extragroup{
    group_no:number
    center_no:number
    }

@Injectable({
  providedIn: 'root'
})
export class AuthGroupService {

  constructor(private http:HttpClient) { }

  public SaveGroup(group): Observable<any> {
    return this.http.post(`http://localhost:3000/center_group/group_no`, group)
  }

  public register(group):Observable<any>{
    console.log('working');
    return this.http.post(`http://localhost:3000/center_group/save_customer_group`,group)
   
  }


  public registerextragroup(group):Observable<any>{
    console.log('reg extara groups working');
    return this.http.post(`http://localhost:3000/center_group/addExtra_group`,group)
    
    }

    public updatecusgroup(group): Observable<any> {
      return this.http.post(`http://localhost:3000/center_group/changecustomergroup`, group)
    }

}
