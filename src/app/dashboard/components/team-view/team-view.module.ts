import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamViewRoutingModule } from './team-view-routing.module';
import { TeamViewComponent } from './team-view.component';
import { MaterialModule } from '../../material.module';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    TeamViewComponent
  ],
  imports: [
    CommonModule,
    TeamViewRoutingModule,
    MaterialModule
  ],
  providers:[AppLoaderService]

})
export class TeamViewModule { }
