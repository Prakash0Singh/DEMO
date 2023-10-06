import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user!: SocialUser;
  constructor(
    private auth: AuthService,
    private authService: SocialAuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Check if token exists in localStorage
    // If it does, navigate to the dashboard home page





    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard/home']);
    }

    // Remove userId from localStorage
    localStorage.removeItem('userId');
    this.authService.authState.subscribe((user: any) => {
      this.user = user;
      let socialData = {
        appid: this.user.authToken,
        name: this.user.name,
        image: this.user.photoUrl,
        email: this.user.email,
        
      };
      let reqBody =  socialData

      this.auth.googlelogin(reqBody).subscribe({
        next :(res:any)=>{
          localStorage.setItem('token',res.data.token)
          console.log(res.data.token)
          this.router.navigate(['dashboard/home']);
        }
      })
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  // Define the login form group
  login = this.fb.group({
    details: ['', Validators.required],
  });

  // Getter for convenient access to form controls in the template
  get f() {
    return this.login.controls;
  }

  // Handle form submission
  submit() {
    console.log(this.login.value, 'Value');

    // Check if the input details contain '@' (indicating an email)
    if (this.login.value.details?.includes('@')) {
      // Store the email in localStorage
      localStorage.setItem('email', this.login.value.details || '');
      localStorage.setItem('email2', this.login.value.details || '');

      // Navigate to the password page
      this.router.navigate(['/auth/password']);
    } else {
      // Prepare data for login request
      let data = {
        mobile: this.login.value.details,
        email: '',
        appid: '',
      };
      // Send login request
      this.auth.login(data).subscribe(
        (res: any) => {
          console.log(res, 'Response');

          if (res.success == true) {
            // Navigate to the OTP verification page
            this.router.navigate(['/auth/otp-verification']);

            // Store the login details in localStorage
            localStorage.setItem(
              'logindetails',
              this.login.value.details || ''
            );

            // Show success message
            this.toastr.success(res.message);
          } else if (res.success == false) {
            // Show error message
            this.toastr.error(res.message);
            console.log(res.message, 'error toastr ');
          }
        },
        (err: any) => {
          // Show error message if something went wrong with the login request
          this.toastr.error('Something Went Wrong');
        }
      );
    }

    // this.login.markAllAsTouched();
  }
}
