import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { JoinedContestDetailsRoutingModule } from './joined-contest-details-routing.module';
import { CdTimerModule } from 'angular-cd-timer';
import { JoinedContestDetailsComponent } from './joined-contest-details.component';
import { MaterialModule } from '../../material.module';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    JoinedContestDetailsComponent
  ],
  imports: [
    CommonModule,
    CdTimerModule,
    JoinedContestDetailsRoutingModule,
    MaterialModule
  ],
  providers:[DatePipe,AppLoaderService]

})
export class JoinedContestDetailsModule { }
