import { Time } from '@angular/common';

export class Installment{
    installment_no ?:number;
    loan_no ?:number;
    amount ?:number;
    total_amount ?:number;
    payment_state ?:string;
    payment_date ?:Date;
    payment_time ?:Time;
    executive_no ?:number;
    cashier_no ?:number;
}