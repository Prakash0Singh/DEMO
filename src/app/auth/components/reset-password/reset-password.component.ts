import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  userId: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve the stored userId from localStorage
    this.userId = localStorage.getItem("userId");
  }

  // Define the reset password form group
  resetForm = this.fb.group({
    password1: ['', [
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
    password: ['', [
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
  }, {
    validator: this.ConfirmedValidator('password1', 'password'),
  });

  // Getter for convenient access to form controls in the template
  get f() {
    return this.resetForm.controls;
  }

  // Custom validator to confirm password fields
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Handle form submission
  submit() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);

      // Prepare data for the password reset request
      let data = {
        suerid: this.userId,
        password: this.resetForm.value.password
      };

      // Call the resetPassword API to reset the password
      this.auth.resetPassword(data).subscribe((res: any) => {
        if (res.success == true) {
          // Show success message
          this.tostr.success(res.message);

          // Navigate to the home page
          this.router.navigate(['']);
        } else {
          // Show error message
          this.tostr.error(res.message);
        }
      });
    }

    // Mark all form controls as touched
    this.resetForm.markAllAsTouched();
  }
}
