import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SelectCaptainRoutingModule } from './select-captain-routing.module';
import { SelectCaptainComponent } from './select-captain.component';
import { CdTimerModule } from 'angular-cd-timer';
import { MaterialModule } from '../../material.module';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    SelectCaptainComponent
  ],
  imports: [
    CommonModule,
    SelectCaptainRoutingModule,
    CdTimerModule,
    MaterialModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class SelectCaptainModule { }
