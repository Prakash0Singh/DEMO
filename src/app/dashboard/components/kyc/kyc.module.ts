import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';


import { KycRoutingModule } from './kyc-routing.module';
import { KycComponent } from './kyc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    KycComponent
  ],
  imports: [
    CommonModule,
    KycRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule
  ],
  providers:[AppLoaderService]

})
export class KycModule { }
