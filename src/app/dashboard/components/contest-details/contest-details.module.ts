import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ContestDetailsRoutingModule } from './contest-details-routing.module';
import { ContestDetailsComponent } from './contest-details.component';
import { CdTimerModule } from 'angular-cd-timer';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    ContestDetailsComponent
  ],
  imports: [
    CommonModule,
    ContestDetailsRoutingModule,
    CdTimerModule,
  ],
  providers:[DatePipe,AppLoaderService]
})
export class ContestDetailsModule { }
