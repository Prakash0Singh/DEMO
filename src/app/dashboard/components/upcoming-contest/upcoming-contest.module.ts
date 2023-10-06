import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UpcomingContestRoutingModule } from './upcoming-contest-routing.module';
import { UpcomingContestComponent } from './upcoming-contest.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    UpcomingContestComponent
  ],
  imports: [
    CommonModule,
    UpcomingContestRoutingModule,
    CdTimerModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class UpcomingContestModule { }
