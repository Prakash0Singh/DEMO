import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CreateTeamRoutingModule } from './create-team-routing.module';
import { CreateTeamComponent } from './create-team.component';
import { CdTimerModule } from 'angular-cd-timer';
import { MaterialModule } from '../../material.module';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    CreateTeamComponent
  ],
  imports: [
    CommonModule,
    CreateTeamRoutingModule,
    CdTimerModule,
    MaterialModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class CreateTeamModule { }
