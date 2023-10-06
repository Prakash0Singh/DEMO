import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PrivateLeagueRoutingModule } from './private-league-routing.module';
import { PrivateLeagueComponent } from './private-league.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    PrivateLeagueComponent
  ],
  imports: [
    CommonModule,
    PrivateLeagueRoutingModule,
    CdTimerModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe,AppLoaderService]

})
export class PrivateLeagueModule { }
