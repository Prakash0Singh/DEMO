import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ApiService } from 'src/app/dashboard/services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-otp-verify',
  templateUrl: './reset-otp-verify.component.html',
  styleUrls: ['./reset-otp-verify.component.scss']
})
export class ResetOtpVerifyComponent implements OnInit, OnDestroy {
  email: any;
  countDown!: Subscription;
  counter = 60;
  tick = 1000;
  time = 59;
  resendEnabled = true;

  // Host listener to handle window load event
  @HostListener('window:load', ['$event'])
  beforeUnloadHander(event: any) {
    window.history.go(-1);
  }

  constructor(
    private auth: AuthService,
    private tostr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Redirect to the reset password page if the userId is already stored in localStorage
    if (localStorage.getItem("userId")) {
      this.router.navigate(['/auth/reset-password']);
    }

    // Retrieve the stored email from localStorage
    this.email = localStorage.getItem("email3");

    // Start the countdown timer
    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      if (this.counter == 0) {
        this.countDown.unsubscribe();
        this.resendEnabled = false;
      }
    });
  }

  resendOtp() {

  }

  otpIn(evt: any) {
    if (evt.length == 4) {
      let data = {
        email: this.email,
        code: evt
      };
      // Call the resetPassOtp API to verify the OTP
      this.auth.resetPassOtp(data).subscribe((res: any) => {
        console.log(res, "FORGOT");
        if (res.success == true) {
          // Show success message
          this.tostr.success(res.message);

          // Navigate to the reset password page
          this.router.navigate(['/auth/reset-password']);

          // Store the userId in localStorage
          localStorage.setItem('userId', res.data.suerid);
        } else {
          // Show error message
          this.tostr.error(res.message);
        }
      });
    }
  }

  onBack() {
    window.history.go(-1);
  }

  ngOnDestroy(): void {
    localStorage.removeItem("email3");
  }
}

