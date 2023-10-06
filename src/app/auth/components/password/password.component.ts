import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy {
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private tostr: ToastrService
  ) {
    // Redirect to the dashboard if a token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      this.router.navigate(['dashboard/home']);
    }
  }

  email: any;

  ngOnInit(): void {
    // Redirect to the previous page if the email is not stored in localStorage
    if (!localStorage.getItem("email")) {
      window.history.go(-1);
    }

    // Retrieve the stored email from localStorage
    this.email = localStorage.getItem("email");
  }

  // Define the password form group
  passwordForm = this.fb.group({
    pass: ['', Validators.required]
  });

  // Getter for convenient access to form controls in the template
  get f() {
    return this.passwordForm.controls;
  }

  // Handle form submission
  submit() {
    console.log(this.passwordForm.value);

    // Check if the password form is valid
    if (this.passwordForm.valid) {
      let data = {
        "email": this.email,
        "password": this.passwordForm.value.pass?.trim()
      };

      // Call the login API to verify the password
      this.auth.login(data).subscribe((res: any) => {
        if (res.success == true) {
          console.log(res, "Response");
          this.tostr.success(res.message);

          // Store the token in localStorage and set it in the AuthService
          localStorage.setItem("token", res.data.token);
          this.auth.authToken = res.data.token;

          // Navigate to the dashboard home page
          this.router.navigate(['/dashboard/home']);
        } else if (res.success == false) {
          console.log(res, "Response");
          this.tostr.error(res.message);
        }
      }, (err: any) => {
        this.tostr.error("Something Went Wrong");
      });
    }

    // Mark all form controls as touched
    this.passwordForm.markAllAsTouched();
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Clear the stored email from localStorage when the component is destroyed
  ngOnDestroy(): void {
    localStorage.removeItem("email");
  }
}
