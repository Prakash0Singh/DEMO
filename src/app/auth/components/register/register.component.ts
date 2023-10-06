import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showPassword = true;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tostr: ToastrService
  ) { }

  ngOnInit(): void {
    // Redirect to the dashboard if a token exists in localStorage
    if (localStorage.getItem("token")) {
      this.router.navigate(['dashboard/home']);
    }
  }

  // Define the register form group
  register = this.fb.group({
    refer: [''],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    mobile: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-z0-9!@#$%^&*()>?.]*')]],
  });

  // Getter for convenient access to form controls in the template
  get f() {
    return this.register.controls;
  }

  // Allow only numbers in the mobile field
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  // Handle form submission
  submit() {
    // Mark all form controls as touched
    this.register.markAllAsTouched();

    // Check if the register form is valid
    if (this.register.valid) {
      console.log(this.register.value, "Value");

      // Prepare data for the temporary user registration
      let data = {
        refer: this.register.value.refer,
        email: this.register.value.email,
        mobile: this.register.value.mobile,
        password: this.register.value.password,
      };

      // Call the postTempUser API to create a temporary user
      this.auth.postTempUser(data).subscribe((res: any) => {
        console.log(res, "Response");
        if (res.success == true) {
          // Show success message
          this.tostr.success(res.message);

          // Store the mobile and temporary user values in localStorage
          localStorage.setItem("Mobile", (this.register.value.mobile) || '');
          localStorage.setItem("Temp", res.data.tempUser);

          // Navigate to the OTP verification page
          this.router.navigate(['/auth/otp-verification']);
        } else {
          // Show error message
          this.tostr.error(res.message);
        }
      });
    }
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
