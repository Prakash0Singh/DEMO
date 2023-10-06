import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private api : ApiService, private fb : FormBuilder,private tostr : ToastrService) { }

  ngOnInit(): void {
  }

  // Form group for change password form
  changePassword = this.fb.group({
    oldpassword : ['',[
      Validators.required,
      Validators.minLength(8),
    ]],
    newpassword : ['',[
      Validators.required,
      Validators.minLength(8),
      (c: AbstractControl) => Validators.required(c),
    ]],
    confirmpassword : ['',[
      Validators.required,
      (c: AbstractControl) => Validators.required(c),
    ]],
  },
  {
    // Custom validator to confirm that new password and confirm password match
    validator: this.ConfirmedValidator('newpassword', 'confirmpassword'),
  })

  get f(){
    return this.changePassword.controls;
  }

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

  submit(){
    if(this.changePassword.valid){
      console.log(this.changePassword.value);

      let data = this.changePassword.value;

      // Call the API to change the password
      this.api.changePassword(data).subscribe((res:any)=>{
        if(res.success == true){
          this.tostr.success(res.message)

          setTimeout(()=>{
            window.history.go(-1);
          },1000)
        }else{
          this.tostr.error(res.message)
        }
      })
    }

    // Mark all form controls as touched to display validation errors
    this.changePassword.markAllAsTouched();
  }
}
