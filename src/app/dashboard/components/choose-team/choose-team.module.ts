import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseTeamRoutingModule } from './choose-team-routing.module';
import { ChooseTeamComponent } from './choose-team.component';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    ChooseTeamComponent
  ],
  imports: [
    CommonModule,
    ChooseTeamRoutingModule
  ],
  providers:[AppLoaderService]

})
export class ChooseTeamModule { }
