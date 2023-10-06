import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { NgOtpInputConfig } from 'ng-otp-input';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  mobile: any;
  tempUser: any;
  userDetail: any;
  countDown!: Subscription;
  counter = 60;
  tick = 1000;
  time = 59;
  resendEnabled = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  // Host listener to handle window load event
  @HostListener('window:load', ['$event'])
  beforeUnloadHander(event: any) {
    window.history.go(-1);
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private tostr: ToastrService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['dashboard/home']);
    } else {
      if (
        !localStorage.getItem('Mobile') &&
        !localStorage.getItem('Temp') &&
        !localStorage.getItem('logindetails')
      ) {
        // this.router.navigate(['/auth/register'])
        window.history.go(-1);
      }
    }
  }

  // Configuration for the OTP input field
  config: NgOtpInputConfig = {
    length: 4,
    // isPasswordInput: true,
    allowNumbersOnly: true,
  };

  ngOnInit(): void {
    // Start the countdown timer
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.countDown.unsubscribe();
        this.resendEnabled = false;
      }
    });

    // Get stored mobile, tempUser, and userDetail values from localStorage
    this.mobile = localStorage.getItem('Mobile');
    this.tempUser = localStorage.getItem('Temp');
    this.userDetail = localStorage.getItem('logindetails');
    console.log(this.tempUser, 'temp');

    // Set a timer to enable the resend button after 60 seconds
    const resendTimer = setTimeout(() => {
      this.resendEnabled = false;
    }, 60000);
  }

  ngOnDestroy(): void {
    // Remove stored values from localStorage and unsubscribe from the countdown timer
    localStorage.removeItem('Mobile');
    localStorage.removeItem('Temp');
    localStorage.removeItem('logindetails');
    this.countDown.unsubscribe();
  }

  resendOtp() {
    // Reset the OTP input field
    this.ngOtpInput.setValue('');
    this.resendEnabled = true;
    this.countDown.unsubscribe();
    this.counter = 60;

    // Restart the countdown timer
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.countDown.unsubscribe();
        this.resendEnabled = false;
      }
    });

    // Handle OTP resend logic based on the context (login or registration)
    if (localStorage.getItem('logindetails')) {
      let data = {
        mobile: this.userDetail,
        email: '',
        appid: '',
      };
      this.auth.login(data).subscribe((res: any) => {
        console.log(res, 'Response');
        if (res.success == true) {
          this.tostr.success(res.message);
        } else if (res.success == false) {
          this.tostr.error(res.message);
          console.log(res.message, 'error toastr');
        }
      });
    } else {
      let data = {
        tempuser: this.tempUser,
      };
      this.auth.postResendOtp(data).subscribe((res: any) => {
        console.log(res, 'otp');
        this.tostr.success(res.message);
      });
    }
  }

  //Checks if the OTP is correct and redirect user to the Home Page
  otpIn(evt: any) {
    if (evt.length == 4) {
      if (localStorage.getItem('Mobile') && localStorage.getItem('Temp')) {
        let data = {
          tempuser: this.tempUser,
          otp: evt,
        };
        this.auth.postAddUser(data).subscribe((res: any) => {
          console.log(res, 'SDFGHYTFDFGHJ');
          if (res.success == true) {
            localStorage.setItem('token', res.data.token);
            this.auth.authToken = res.data.token;
            this.tostr.success(res.message);
            this.router.navigate(['/dashboard/home']);
          } else {
            this.tostr.error(res.message);
          }
        });
      } else if (localStorage.getItem('logindetails')) {
        let data = {
          mobile: this.userDetail,
          otp: evt,
        };
        this.auth.loginOtp(data).subscribe((res: any) => {
          console.log(res, 'SDFGHYTFDFGHJ');
          if (res.success) {
            this.tostr.success(res.message);
            localStorage.setItem('token', res.data.token);
            this.auth.authToken = res.data.token;
            this.router.navigate(['/dashboard/home']);
          } else {
            this.tostr.error(res.message);
          }
        });
      }
    }
  }

  onBack() {
    window.history.go(-1);
  }
}
