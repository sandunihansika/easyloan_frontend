
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable,of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'

export interface EmpDetails{
    employee_no: number,
    employee_name: string,
    employee_img:string,
    gender:string,
    birthdate:string,
    nic_no:string,
    address:string,
    tp_no:string,
    email_adress:string,
    employee_type:string,
    epf_no:string,
    etf_no:string,
    e_password :string,
    password_hint:string,
    exp:number,
    iat:number
}

export interface ExecutiveDetails{
    employee_no: number,
    bike_no: string
}


interface TokenResponse{
    token:string
}

export interface TokenPayLoad{
   employee_no: number,
    employee_name: string,
    employee_img:string,
    gender:string,
    birthdate:string,
    nic_no:string,
    address:string,
    tp_no:string,
    email_adress:string,
    employee_type:string,
    epf_no:string,
    etf_no:string,
    e_password :string,
    password_hint:string

}

export interface ExPayload{
    employee_no: number,
    bike_no: string
}




@Injectable()
export class AuthenticationService{
    private token:string

    constructor(private http:HttpClient,private router:Router){}

   public saveToken (token:string):void{
        localStorage.setItem('empToken',token)
        this.token=token
    }

    public getToken():string{
        if(!this.token){
            this.token=localStorage.getItem('empToken')
        }
        return this.token
    }

   public getEmpDetails():EmpDetails{
    const token=this.getToken()
    let payload
    if(token){
    payload=token.split('.')[1]
    payload=window.atob(payload)
    return JSON.parse(payload)
    }else{
    return null;
    }
    }

public pwdint(emp):Observable<any>{
    return this.http.post(`http://localhost:3000/employees/pwd_hint`,emp)
}

   public registerEmp(employee:TokenPayLoad):Observable<any>{
        return this.http.post(`http://localhost:3000/employees/emp_register`,employee)
    }

    public regisierExecutive(executive:ExPayload):Observable<any>{
        return this.http.post(`http://localhost:3000/employees/bike_no`,executive)

    }


   public login(employee):Observable<any>{
       console.log('login working');
        const base=this.http.post(`http://localhost:3000/employees/login`,employee)
        const request=base.pipe(
            map((data:TokenResponse)=>{
                if(data.token){
                    this.saveToken(data.token)
                }

                return data
            })
        )
        return request
    }

   
      public uploadProfileImage(fd):Observable<any>{
        return this.http.post(`http://localhost:3000/employees/proImage`,fd)
      }

      public updateProfileImage(fd):Observable<any>{
        return this.http.post(`http://localhost:3000/employees/updateProf`,fd)
      }

    public logout():void{
        //console.log('logout');
        this.token=''
        window.localStorage.removeItem('empToken')
        this.router.navigateByUrl('/')
    }

    public delete(id):Observable<any>{
        return this.http.post(`http://localhost:3000/employees/deleteEmp`,id)
    }

    
    public allEmployees():Observable<any>{
    return this.http.get(`http://localhost:3000/employees/get_emp`)
}



 public loadExecutive(ex):Observable<any>{
    return this.http.post(`http://localhost:3000/employees/loadEx`,ex)
   }
    
   public updateEmp(emp):Observable<any>{
    return this.http.post(`http://localhost:3000/employees/updateEmp`,emp)
   }

   public updateBike(bike):Observable<any>{
    return this.http.post(`http://localhost:3000/employees/updateBike`,bike)
   }

   public updateUser(req):Observable<any>{
    const base=this.http.post(`http://localhost:3000/employees/updateUser`,req)
    const request=base.pipe(
        map((data:TokenResponse)=>{
            if(data.token){
                this.saveToken(data.token)
            }

            return data
        })
    )
    return request
   }
  
   
   public updateUaerImage(req):Observable<any>{
    const base=this.http.post(`http://localhost:3000/employees/updateUserImage`,req)
    const request=base.pipe(
        map((data:TokenResponse)=>{
            if(data.token){
                this.saveToken(data.token)
            }

            return data
        })
    )
    return request
   }

   public empCount():Observable<any>{
    return this.http.get(`http://localhost:3000/employees/empCount`)
}

public Allex():Observable<any>{
    return this.http.get(`http://localhost:3000/employees/executives`)
}

}
