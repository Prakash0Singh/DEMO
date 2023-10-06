import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FilteredContestRoutingModule } from './filtered-contest-routing.module';
import { FilteredContestComponent } from './filtered-contest.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    FilteredContestComponent
  ],
  imports: [
    CommonModule,
    FilteredContestRoutingModule,
    CdTimerModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class FilteredContestModule { }
