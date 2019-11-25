import { Installment } from './installment.model';
import { Payment } from './payment.model';
import { Customer } from './customer.model';
import { LoanType } from './loantype.model';

export class Loan{
    loan_no ?:number;
    customer_id ?:number;
    loan_index ?:number;
    loan_date ?:Date;
    due_start_date?:Date;
    approve_state?:string;
    authorize_state?:string;
    disburse_state ?:string;
    installment?: Installment;
    customer?: Customer
    payment?: Payment;
    loan_type?:LoanType;
}









