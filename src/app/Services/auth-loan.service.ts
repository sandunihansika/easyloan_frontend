import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoanDetails{
  loan_no:number   
  customer_id:number
  customer_name:string
  loan_type:string
  center_name:string
  no_dues:number
  amount:number
  duestart_date:string
  dueend_date:string
  gurantor1:string
  gurantor2:string
  
      
      }
  
  interface TokenResponse{
      token:string
  }

  export interface LoanPayLoad{
    loan_no:number,   
    customer_id:number,
    customer_name:string,
    loan_type:string,
    center_name:string,
    no_dues:number,
    amount:number,
    duestart_date:string,
    dueend_date:string,
    gurantor1:string,
    gurantor2:string
    
    }
    


@Injectable({
  providedIn: 'root'
})
export class AuthLoanService {

  constructor(private http:HttpClient,private router:Router,private auth:AuthenticationService) { }


//loan enter form

public register(loan):Observable<any>{
  console.log('reg working');
return this.http.post(`http://localhost:3000/loans/register`,loan)

}

public loanCount():Observable<any>{
  return this.http.get(`http://localhost:3000/loans/loanCount`)
}




  public getAllInstallmentDetails():Observable<any>{
    return this.http.get('http://localhost:3000/loans/full_details');
  }


  //////////////////////sajith


  public getGuaranter(idforSearch):Observable<any>{
    return this.http.post(`http://localhost:3000/loans/get_members`,idforSearch)
  }
  
  
  public allLoanTypes():Observable<any>{
    console.log('calling types centers');
    return this.http.get(`http://localhost:3000/loans/get_loantypes`)
  
  }
  
  
  
    public getCustomerDetails(id):Observable<any>{
     return this.http.post(`http://localhost:3000/loans/selected_customer`,id)
    }
  
    public getAppliedLoans(){
      return this.http.get(`http://localhost:3000/loans/get_appliedList`)
     
    }
  
    public loanApprove(loan):Observable<any>{
      console.log('front is ok')
      return this.http.post(`http://localhost:3000/loans/approve_loan`,loan)
     
    }
  
    public getApprovedLoans(){
      return this.http.get(`http://localhost:3000/loans/get_approvedList`)
     
    }
  
    public loanAuthorize(loan):Observable<any>{
      return this.http.post(`http://localhost:3000/loans/authorize_loan`,loan)
     
    }
  
    public getAuthorized(){
      return this.http.get(`http://localhost:3000/loans/get_authorizedList`)
     
    }
  
    public loandisburst(loan):Observable<any>{
      return this.http.post(`http://localhost:3000/loans/disburse_loan`,loan)
     
    }
  
    public deleteLoan(loan):Observable<any>{
      return this.http.post(`http://localhost:3000/loans/delete_loan`,loan)
     
    }
  
    public reverseApproval(loan):Observable<any>{
      return this.http.post(`http://localhost:3000/loans/reverse_approval`,loan)
     
    }
  
    public reverseAuthorize(loan):Observable<any>{
      return this.http.post(`http://localhost:3000/loans/reverse_athorize`,loan)
     
    }
  
  //sanduniiiiiiiiiiiiiiiiiiiiiiiiiiiii

  public allloans():Observable<any>{
    return this.http.get(`http://localhost:3000/loans/get_onecus`)
  }

    public loanNo(loan):Observable<any>{
      console.log("loan no calling")
      return this.http.post(`http://localhost:3000/loans/reg_loanNo`,loan)
    }

   /* public loanNo(Loandetails){
      return this.http.post(`/api/loan/reg_loanNo`,Loandetails);
    }*/

    public allLoanType():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_loanType`)
    }
  
    
   /* public all(no){
      return this.http.post('/loans/allLoan',no)
    }*/

    public dates(fd){
      return this.http.post('http://localhost:3000/loans/dateRange',fd)
    }

    public allLoanPay():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_cusdetails`)
    }

    public loanDis():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_loanDisburse`)
    }

    public loanSet():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_loanSettle`)
    }

    public loanDetails():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_loanDetails`)
    }

    public loanTotal():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_loantotal`)
    }

    public loanCancel():Observable<any>{
      return this.http.get(`http://localhost:3000/loans/get_cancelLoans`)
    }


}
