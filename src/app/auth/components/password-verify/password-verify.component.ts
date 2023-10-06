import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-verify',
  templateUrl: './password-verify.component.html',
  styleUrls: ['./password-verify.component.scss']
})
export class PasswordVerifyComponent implements OnInit, OnDestroy {
  email: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private tostr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Redirect to the previous page if the email is not stored in localStorage
    if (!localStorage.getItem("email2")) {
      window.history.go(-1);
    }

    // Retrieve the stored email from localStorage
    this.email = localStorage.getItem("email2");

    // Set the email as the initial value in the password form
    this.passwordForm.patchValue({
      pass: this.email,
    });
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
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value, "Value");

      // Prepare data for the forgot password request
      let data = {
        email: this.email,
      };

      // Call the forgotPassword API
      this.auth.forgotPassword(data).subscribe((res: any) => {
        console.log(res, "Response");
        if (res.success == true) {
          // Show success message
          this.tostr.success(res.message);

          // Store the email in localStorage
          localStorage.setItem("email3", this.email);

          // Navigate to the password reset OTP verification page
          this.router.navigate(['/auth/reset-otp-verify']);
        } else {
          // Show error message
          this.tostr.error(res.message);
        }
      });
    }
  }

  // Clear the stored email from localStorage when the component is destroyed
  ngOnDestroy(): void {
    localStorage.removeItem("email2");
  }
}
