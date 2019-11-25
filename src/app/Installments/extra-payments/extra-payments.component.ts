import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'minimatch';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthLoanService } from 'src/app/Services/auth-loan.service';
import { AuthInstallmentService } from 'src/app/Services/auth-installment.service';
import { Installment } from 'src/app/models/installment.model';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-extra-payments',
  templateUrl: './extra-payments.component.html',
  styleUrls: ['./extra-payments.component.css']
})
export class ExtraPaymentsComponent implements OnInit {
  filterForm: FormGroup;
  centers = ["Select"];
  paymentList = [];
  // amount = 0;
  searchInput = '';
  amountForm: FormGroup;
  filteredPaymentList = [];
  bindToUiPayments = [];
  myData: any = {};
  user_no: number = 6468;
  tableData = [];
  filteredTableData = [];

  constructor(private loanService: AuthLoanService, public toastr: ToastrManager, private installmentService: AuthInstallmentService,private auth:AuthenticationService) { 
    this.filterForm = new FormGroup({
      sortType: new FormControl(1),
      searchSection: new FormControl()
    })
    this.amountForm = new FormGroup({
      amountControl: new FormControl()
    })
    
    
    this.loanService.getAllInstallmentDetails().subscribe(data => {
      // console.log(data);
      this.paymentList = data;
      this.paymentList.sort(this.comparerer);
      this.filteredPaymentList = this.paymentList;
      this.bindToUiPayments = this.paymentList;
      console.log(this.bindToUiPayments);
      // this.amount = this.paymentList[0].loan.installments[0].amount;
      // console.log(this.amount);
      
    })
    // console.log(this.bindToUiPayments);
    
  }

  
  comparerer(a: any, b: any) {
    if(a.customer_id < b.customer_id) {
      return -1;
    } else if (a.customer_id > b.customer_id) {
      return 1;
    } else {
      return 0;
    }
  }

  comparererNIC(a: any, b: any) {
   if(a.customer.nic_no < b.customer.nic_no) {
     return -1;
   } else if (a.customer.nic_no > b.customer.nic_no) {
     return 1;
   } else {
     return 0;
   }
 }



  ngOnInit() {
  }

  onChange() {
    // if(this.filterForm.value.center != null && this.filterForm.value.sortType != null) {
    //   console.log("--------");
    // }
    this.myData = {}
    if(this.filterForm.value.sortType == 1) {
      if(this.searchInput == '' || this.searchInput == null) {
        this.filteredPaymentList = this.paymentList;
      }
      var matchData = []
      this.filteredPaymentList.forEach(data => {
        // console.log(data);
        var n = data.customer_id.toString().startsWith(this.searchInput)
        // console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      matchData.sort(this.comparerer);
      // console.log(matchData);
      this.bindToUiPayments = matchData;
    } else {
      if(this.searchInput == '' || this.searchInput == null) {
        this.filteredPaymentList = this.paymentList;
      }
      var matchData = []
      this.filteredPaymentList.forEach(data => {
        var n = data.customer.nic_no.startsWith(this.searchInput)
        // console.log(n);
        if(n) {
          matchData.push(data)
        }
      })
      matchData.sort(this.comparererNIC);
      // console.log(matchData);
      this.bindToUiPayments = matchData;
    }
  }

  onSave(loanNo: number, inputVal: number, balance: number){
    // console.log(loanNo);
    // console.log(inputVal);
    // var selectedInstallment = new Loan();
    // this.tableData.find((data) => {
    //   console.log(data);
    //   if(data.payments[0].payment_id == loanNo ) {
    //     selectedInstallment = data;
    //   }
    // })
    // console.log(loanNo);
    // var date = new Date();
    console.log('calling post')
    var installmentFormattedData: Installment = {
      loan_no: loanNo,
      amount: inputVal,
      cashier_no: this.auth.getEmpDetails().employee_no,
    }
    // console.log("------------------");
    // console.log(installmentFormattedData);
    // console.log("=============");
    // console.log(balance);
    // console.log(this.filteredTableData);
    // console.log(inputVal);
    if(balance >= inputVal) {
      this.installmentService.postNewInstallment(installmentFormattedData).subscribe(result => {
      // console.log("done");
      // console.log(result);
        if(result === 200) {
          // console.log("doneeee");
          // this.loanService.getAllInstallmentDetails().subscribe(data => {
          //   // console.log(data);
          //   this.paymentList = data;
          //   this.paymentList.sort(this.comparerer);
          //   this.filteredPaymentList = this.paymentList;
          //   this.bindToUiPayments = this.paymentList;
          //   console.log(this.bindToUiPayments);
          //   if(this.filterForm.value.sortType != null || this.filterForm.value.searchInput != null || this.filterForm.value.sortType != '' || this.filterForm.value.searchInput != '') {
          //     this.filterForm.value.searchInput = '';
          //     this.filterForm.value.sortType = 1;
          //     this.onChange()
          //   }
            // this.amount = this.paymentList[0].loan.installments[0].amount;
            // console.log(this.amount);
            this.toastr.successToastr('Payment added successfully', 'Success!', {
              position:'bottom-center'
            });
            this.loanService.getAllInstallmentDetails().subscribe(data => {
                // console.log(data);
                this.paymentList = data;
                this.paymentList.sort(this.comparerer);
                this.filteredPaymentList = this.paymentList;
                this.bindToUiPayments = this.paymentList;
                console.log(this.bindToUiPayments);
                if(this.filterForm.value.sortType != null || this.filterForm.value.searchInput != null || this.filterForm.value.sortType != '' || this.filterForm.value.searchInput != '') {
                  // this.filterForm.value.searchInput = '';
                  // this.filterForm.value.sortType = 1;
                  this.onChange()
                }
          })
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

}
