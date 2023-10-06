import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveContestDetailsRoutingModule } from './live-contest-details-routing.module';
import { LiveContestDetailsComponent } from './live-contest-details.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    LiveContestDetailsComponent
  ],
  imports: [
    CommonModule,
    LiveContestDetailsRoutingModule
  ],
  providers:[AppLoaderService]

})
export class LiveContestDetailsModule { }
