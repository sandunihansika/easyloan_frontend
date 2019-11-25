import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthPaymentService {

  constructor(private http:HttpClient) { }
  public getAllExtraPaymentDetals():Observable<any>{
    return this.http.get('http://localhost:3000/payment/all_payments');
  }
}
