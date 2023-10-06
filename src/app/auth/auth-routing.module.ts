import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordComponent } from './components/password/password.component';
import { PasswordVerifyComponent } from './components/password-verify/password-verify.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetOtpVerifyComponent } from './components/reset-otp-verify/reset-otp-verify.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login', title:'login ',
        component: LoginComponent,
      },
      {
        path: 'register',title:'register ',
        component: RegisterComponent,
      },
      {
        path: 'otp-verification',title:'otp-verification ',
        component: OtpVerificationComponent,
      },
      {
        path: 'password', title:'password ',
        component: PasswordComponent,
      },
      {
        path: 'password-verify',title:'password-verify ',
        component: PasswordVerifyComponent,
      },
      {
        path: 'create-profile',title:'create-profile ',
        component: CreateProfileComponent,
      },
      {
        path: 'reset-password',title:'reset-password ',
        component: ResetPasswordComponent,
      },
      {
        path: 'reset-otp-verify',title:'reset-otp-verify ',
        component: ResetOtpVerifyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
