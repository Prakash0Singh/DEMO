import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppLoaderService } from '../app-loader/app-loader.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-cash',
  templateUrl: './add-cash.component.html',
  styleUrls: ['./add-cash.component.scss'],
})
export class AddCashComponent implements OnInit {
  value: any = 100;
  showamt = true;
  myOffers: any = [];
  userInfo: any = [];
  hash: any;
  newData: any;
  data:any={};
  url:any;
  rzp1:any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private location: Location,
    private router : Router,
    private loader : AppLoaderService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    // this.loader.open()
    this.api.getOffers().subscribe((res: any) => {
      this.myOffers = res.data;
      console.log(this.myOffers, 'RESPONSE');
      // this.loader.close()
      this.userDetails();
      this.url = this.getCurrentURL()
      console.log(this.url,"URLL");
      
    });

   
  }

  getCurrentURL () {
    return window.location.href
  }

  userDetails() {
    this.api.userFullDetails().subscribe((res: any) => {
      this.userInfo = res.data;
    });
  }

  addCash: FormGroup = this.fb.group({
    cash: [this.value,[ Validators.required, , Validators.min(100)]],
    code: [],
  });

  onAdd(val: any) {
    this.value = Number(this.value) + val;
  }

  keyPressNumbers(event: any) {
    // Only Numbers 0-9
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }

  onCode(d: any) {
    this.myOffers.filter((x: any) => {
      if (x._id == d._id) {
        this.addCash.patchValue({
          cash: x.max_amount,
          code: x.offer_code,
        });
      }
    });
  }

  // async sha256(message: any) {
  //   const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  //   const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
  //   const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  //   const hashHex = hashArray
  //     .map((b) => b.toString(16).padStart(2, '0'))
  //     .join(''); // convert bytes to hex string
  //   this.hash = hashHex + '###' + 1;
  //   console.log(this.hash, 'sha256.......');
  // }

  // async H(m:any) {
  //   const msgUint8 = new TextEncoder().encode(m)
  //   const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  //   const hashArray = Array.from(new Uint8Array(hashBuffer))
  //   const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  //   console.log(hashHex)
  // }

  submitCash() {   
    let obj = {
      amount: this.value,
      paymentby: 'phonepay',
      offerid: this.addCash.value.code || '',
    };
    this.api.requestAddCash(obj).subscribe((res: any) => {
      console.log(res);


      // RAZOR-PAY
        let options = {
        "key": "rzp_test_du8jJUxQb7hup4",
        "amount": res.data.amount*100, 
        "currency": "INR",
        "name": "Play-Cricket", 
        "description": "Test Transaction",
        // "image":"assets/svg/img/img_logo.jpeg",
        "order_id": res.data.order_id,
        // "handler": function (response:any){
        //     alert(response.razorpay_payment_id);
        //     alert(response.razorpay_order_id);
        //     alert(response.razorpay_signature)
        // },
        "prefill": {
            "name": this.userInfo.name, 
            "email":this.userInfo.email, 
            "contact": this.userInfo.mobile,
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
      this.rzp1 = new this.api.nativeWindow.Razorpay(options);
      this.rzp1.open()
});

  }
  onBack() {
    this.location.back();
  }
}


// {"merchantId":"PGTESTPAYUAT103","merchantTransactionId":"MG11-add-1683019928494SLKS","merchantUserId":"6414602c2e74c74fd2b7c858","amount":10000,"redirectUrl":"http://localhost:4200/dashboard/home","redirectMode":"POST","callbackUrl":"https://api.mygames11.com/api/phonePayWebhook","mobileNumber":"9636723172","paymentInstrument":{"type":"PAY_PAGE"}}
// {"merchantId":"PGTESTPAYUAT103","merchantTransactionId":"MG11-add-1683019928494SLKS","merchantUserId":"6414602c2e74c74fd2b7c858","amount":10000,"redirectUrl":"http://localhost:4200/dashboard/home","redirectMode":"POST","callbackUrl":"https://api.mygames11.com/api/phonePayWebhook","mobileNumber":9636723172,"paymentInstrument":{"type":"PAY_PAGE"}}
// {"merchantId":"PGTESTPAYUAT103","merchantTransactionId":"MG11-add-1683019928941SLKS","merchantUserId":"6414602c2e74c74fd2b7c858","amount":10000,"redirectUrl":"http://localhost:4200/dashboard/home","redirectMode":"POST","callbackUrl":"https://api.mygames11.com/api/phonePayWebhook","mobileNumber":9636723172,"paymentInstrument":{"type":"PAY_PAGE"}}
// {"merchantId":"MGELEVENONLINE","merchantTransactionId":"MG11-add-1683539872103QERQ","merchantUserId":"63c7e5203ea3aa29defd7a78","amount":10000,"redirectUrl":"http://localhost:4200/dashboard/home","redirectMode":"POST","callbackUrl":"https://api.mygames11.com/api/phonePayWebhook","mobileNumber":9907474775,"paymentInstrument":{"type":"PAY_PAGE"}}