import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MyMatchesRoutingModule } from './my-matches-routing.module';
import { MyMatchesComponent } from './my-matches.component';
import { CdTimerModule } from 'angular-cd-timer';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    MyMatchesComponent
  ],
  imports: [
    CommonModule,
    MyMatchesRoutingModule,
    CdTimerModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class MyMatchesModule { }
