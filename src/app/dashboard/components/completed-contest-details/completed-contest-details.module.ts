import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedContestDetailsRoutingModule } from './completed-contest-details-routing.module';
import { CompletedContestDetailsComponent } from './completed-contest-details.component';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    CompletedContestDetailsComponent
  ],
  imports: [
    CommonModule,
    CompletedContestDetailsRoutingModule
  ],
  providers:[AppLoaderService]

})
export class CompletedContestDetailsModule { }
