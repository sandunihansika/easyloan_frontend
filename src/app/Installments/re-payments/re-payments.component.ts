import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormBuilder, FormArray } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthCenterService } from 'src/app/Services/auth-center.service';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';
import { AuthInstallmentService } from 'src/app/Services/auth-installment.service';
import { Installment } from 'src/app/models/installment.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';


@Component({
  selector: 'app-re-payments',
  templateUrl: './re-payments.component.html',
  styleUrls: ['./re-payments.component.css']
})
export class RePaymentsComponent implements OnInit {
  filter: FormGroup;
  centers = [];
  centerDetails = []
  tableData = []
  paidAmount = 0;
  filteredTableData = [];
  selectedCenterNo = null;
  amount=0;
  paymentForm: FormGroup;
  user_no: number = 6467;
  myData: any = {};
  filteredCenterData = [];
  filteredDateData = [];
  filterNullable = false;

  constructor(private centerService: AuthCenterService, public toastr: ToastrManager, private loanService: AuthLoanService, private installmentService: AuthInstallmentService,private auth:AuthenticationService) { 
    this.filter = new FormGroup({
      center: new FormControl(),
      date: new FormControl()
    })
    this.paymentForm = new FormGroup({
      paidAmountCon: new FormControl()
    })
    this.centerService.getAllCenterDetals().subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.centers.push(element.center_name)
        this.centerDetails.push(element);
      });
      // this.user_no = data.employee_no;
      console.log(this.centers);
      
    })
    this.loanService.getAllInstallmentDetails().subscribe(data => {
      this.tableData = data;
      console.log(this.tableData);
      // this.addAmountDummies(this.tableData.length);
    })
    // console.log(this.tableData);
    
  }

  ngOnInit() {
  }

  compareDate(d1: Date, d2: Date) {
    if(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()) {
      return true;
    } else {
      return false;
    }
  }

  onDateChange() { 
    // console.log(this.filteredCenterData);
    // console.log(this.tableData);
    // this.filteredTableData = [];
    // console.log(this.tableData);
    this.myData = {};
    this.filteredDateData = [];
    if(this.filter.value.center == null) {
      console.log('no center');
      if(this.filter.value.date == null || this.filter.value.date == ''){
        console.log('no date');
        this.filteredDateData = this.tableData;
      } else {
        // console.log('date');
        this.tableData.forEach(data => {
          if(data.payment != null) {
            if(this.compareDate(new Date(data.payment.payment_duedates), new Date(this.filter.value.date))) {
              this.filteredDateData.push(data)
              // console.log('pushed');
            }
          } else {
            if(this.compareDate(new Date(data.due_start_date), new Date(this.filter.value.date))) {
              this.filteredDateData.push(data)
              // console.log('pushed');
            }
          }
        })
        this.filterNullable = true
      }
    } else {
      console.log('center');
      console.log(this.filter.value.date);
      // console.log(this.filteredCenterData);
      if(this.filter.value.date == null || this.filter.value.date == ''){
        console.log('no date');
        this.centerDetails.forEach(centerDe => {
          if(this.filter.value.center == centerDe.center_name)  {
            this.selectedCenterNo = centerDe.center_no;
            // console.log(centerDe.center_no);
            // this.filterNullable = true;
          }
        });
        // this.filteredDateData = this.filteredCenterData;
        console.log(this.tableData);
        this.tableData.forEach(data => {
          if(data.payment != null) {
            if(data.customer.center_no == this.selectedCenterNo) {
              this.filteredDateData.push(data)
              // console.log('pushed');
            } 
          } else {
            console.log(new Date(data.due_start_date));
            if(data.customer.center_no == this.selectedCenterNo) {
              this.filteredDateData.push(data)
              // console.log('pushed');
            }
          }
        })
        this.filterNullable = true;
      } else {
        console.log('date');
        // this.tableData.forEach(data => {
        //   if(this.compareDate(new Date(data.payment.payment_duedates), new Date(this.filter.value.date))) {
        //     this.filteredDateData.push(data)
        //     console.log('pushed');
        //   }
        // });    
        
        this.centerDetails.forEach(centerDe => {
          if(this.filter.value.center == centerDe.center_name)  {
            this.selectedCenterNo = centerDe.center_no;
            // console.log(centerDe.center_no);
            // this.filterNullable = true;
          }
        });
        // this.filteredDateData = this.filteredCenterData;
        this.tableData.forEach(data => {
          if(data.payment != null) {
            if(this.compareDate(new Date(data.payment.payment_duedates), new Date(this.filter.value.date)) && data.customer.center_no == this.selectedCenterNo) {
              this.filteredDateData.push(data)
              // console.log('pushed');
            }
          } else {
            if(this.compareDate(new Date(data.due_start_date), new Date(this.filter.value.date))  && data.customer.center_no == this.selectedCenterNo) {
              this.filteredDateData.push(data)
              // console.log('pushed');
            }
          }
        })
        this.filterNullable = true
        // this.filterNullable = true
      }
    }
    this.filteredTableData = this.filteredDateData;
    // console.log(this.filteredDateData);
    // console.log(this.filteredTableData);    
    
  }

  onChange() {
    this.myData={};
    // console.log(this.filter.value);
    if(this.filter.value.date == null || this.filter.value.date == '') {
      // console.log('date null');
      if(this.filter.value.center == null) {
        // console.log("--------");
        // console.log('center null');
        this.filteredCenterData = this.tableData;
      } else {
        // console.log('center not null');
        this.centerDetails.forEach(centerDe => {
          if(this.filter.value.center == centerDe.center_name)  {
            this.selectedCenterNo = centerDe.center_no;
            // console.log(centerDe.center_no);
            // this.filterNullable = true;
          }
        })
        this.filteredCenterData = [];
        this.tableData.forEach(data => {
          // if(data.customer.center_no == this.selectedCenterNo && data.installments[0].total_amount < data.payment.payable_amount) {
          //   this.filteredCenterData.push(data);
          // }

          if(data.payment != null) {
            if(data.customer.center_no == this.selectedCenterNo) {
              this.filteredCenterData.push(data)
              // console.log('pushed');
            }
          } else {
            if(data.customer.center_no == this.selectedCenterNo) {
              this.filteredCenterData.push(data)
              // console.log('pushed');
            }
          }
        })
        this.filterNullable = true;
      }
    } else {
      console.log('date not null');
      if(this.filter.value.center == null || this.filter.value.center=='') {
        // console.log("--------");
        console.log('center null');
        this.filteredCenterData = this.filteredDateData;
        this.filteredTableData.forEach((data) => {
          if(data.payment != null) {
            if(this.compareDate(new Date(data.payment.payment_duedates), new Date(this.filter.value.date)) ) {
              this.filteredCenterData.push(data)
              // console.log('pushed');
            }
          } else {
            if(this.compareDate(new Date(data.due_start_date), new Date(this.filter.value.date))  && data.customer.center_no == this.selectedCenterNo) {
              this.filteredCenterData.push(data)
              // console.log('pushed');
            }
          }
        });
      } else {
        console.log('center not null');
        this.filteredCenterData = [];
        this.centerDetails.forEach(centerDe => {
          if(this.filter.value.center == centerDe.center_name)  {
            this.selectedCenterNo = centerDe.center_no;
            // console.log(centerDe.center_no);
          }
        })
        this.tableData.forEach(data => {
          // if(data.customer.center_no == this.selectedCenterNo && this.compareDate(new Date(this.filter.value.date), new Date(data.payment.payment_duedates))) {
          //   this.filteredCenterData.push(data)
          // }

          if(data.payment != null) {
            if(this.compareDate(new Date(data.payment.payment_duedates), new Date(this.filter.value.date)) && data.customer.center_no == this.selectedCenterNo) {
              this.filteredCenterData.push(data)
              // console.log('pushed');
            }
          } else {
            if(this.compareDate(new Date(data.due_start_date), new Date(this.filter.value.date))  && data.customer.center_no == this.selectedCenterNo) {
              this.filteredCenterData.push(data)
              // console.log('pushed');
            }
          }
        })
        this.filterNullable = true;
      }
    }
    // console.log(this.filteredCenterData);
    this.filteredTableData = this.filteredCenterData;
  }

  onSave(loanNo: number, inputVal: number, balance: number){
    console.log(loanNo);
    console.log(inputVal);
    // var selectedInstallment = new Loan();
    // this.tableData.find((data) => {
    //   console.log(data);
    //   if(data.payment.payment_id == i ) {
    //     selectedInstallment = data;
    //   }
    // })
    // console.log(selectedInstallment);
    // var date = new Date();
    var installmentFormattedData: Installment = {
      loan_no: loanNo,
      amount: inputVal,
      cashier_no: this.auth.getEmpDetails().employee_no,
    }
    // console.log("------------------");
    console.log(installmentFormattedData);
    // console.log("=============");
    console.log(balance);
    console.log(this.filteredTableData);
    console.log(inputVal);
    if(balance >= inputVal) {
      this.installmentService.postNewInstallment(installmentFormattedData).subscribe(result => {
      // console.log("done");
      // console.log(result);
        if(result === 200) {
          // console.log("doneeee");
          this.loanService.getAllInstallmentDetails().subscribe(data => {
            this.tableData = data;
            console.log('added');
            console.log(this.tableData);
            this.toastr.successToastr('Payment added successfully', 'Success!', {
              position:'bottom-center'
            });
            if(this.filter.value.date != null || this.filter.value.date != '') {
              this.onDateChange();
            } else if (this.filter.value.center != null || this.filter.value.center != '') {
              this.onChange();
            } else {
              this.tableData = this.tableData;
            }
            // this.addAmountDummies(this.tableData.length);
          });
        } else {
          this.toastr.errorToastr('Enter payment amount', 'Error!', {
            position:'bottom-center'
          });
        }
      })
    } else {
      this.toastr.errorToastr('Invalid payment', 'Error!', {
        position:'bottom-center'
      });
    }
  }
  onCancel(){
    console.log("-----");
  } 
}
