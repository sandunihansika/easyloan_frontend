import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInstallmentService {

  constructor(private http: HttpClient) { }

  public postNewInstallment(installmentDetails): Observable<any>{
    return this.http.post('http://localhost:3000/installment/new', installmentDetails);
  }

  public getInstallmentDetailsForReport(loan_no): Observable<any>{
    return this.http.post(`http://localhost:3000/installment/installment_payment`,loan_no)
  }

  
  public todayBulks(): Observable<any>{
    return this.http.get(`http://localhost:3000/installment/todayBulks`)
  }

}
