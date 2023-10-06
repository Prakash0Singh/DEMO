import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  userDetails: any = []
  pan: any = []
  bankInfo: any = []

  constructor(public api: ApiService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.api.userFullDetails().subscribe((res: any) => {
      this.userDetails = res.data;
      console.log(this.userDetails, "DETAILS");
      this.panDetails()
      this.bankDetails()
    })

    //  else if(this.userDetails.BankVerified==1 && this.userDetails.PanVerified==1 ){
    //     this.router.navigate(['/dashboard/withdraw'])
    //   }

  }
  withdrawform: FormGroup = this.fb.group({
    amount: ['', Validators.required]
  });


  panDetails() {
    this.api.getPanDetails().subscribe((res: any) => {
      console.log(res, "PAN DETAILS");
      this.pan = res.data;
    })
  }
  bankDetails() {
    this.api.getBankDetails().subscribe((res: any) => {
      console.log(res, "BANK DETAILS");
      this.bankInfo = res.data
    })
  }

  //helps in withdrawing the money from the wallet
  withdraw() {
    console.log(this.withdrawform.value, 'form valuw');

    let obj = {
      "amount": this.withdrawform.value.amount,
      "type": "Bank",
      "withdrawfrom": "winning"
    }
    this.api.withdraw(obj).subscribe((res: any) => {
      console.log(res, 'withdraw amount ');
      if (res.status) {
        this.toastr.success(res.message)
      }
      // navigate  user to kyc page to complete kyc details 
      else if (res.status == false) {
        this.toastr.error(res.message)
        if (this.userDetails.BankVerified == 0 && this.userDetails.PanVerified == 0) {
          this.router.navigate(['/dashboard/kyc'])
        }
        // this.router.navigate(['/dashboard/kyc'])
      }

    })
  }
}




