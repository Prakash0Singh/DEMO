import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { CdTimerModule } from 'angular-cd-timer';
import { PasswordComponent } from './components/password/password.component';
import { PasswordVerifyComponent } from './components/password-verify/password-verify.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetOtpVerifyComponent } from './components/reset-otp-verify/reset-otp-verify.component';

// import { DashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    OtpVerificationComponent,
    PasswordComponent,
    PasswordVerifyComponent,
    CreateProfileComponent,
    ResetPasswordComponent,
    ResetOtpVerifyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    CdTimerModule,
    // DashboardModule
  ],
  providers:[AuthModule]
})
export class AuthModule { }
