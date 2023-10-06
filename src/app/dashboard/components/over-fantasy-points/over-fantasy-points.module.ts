import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverFantasyPointsRoutingModule } from './over-fantasy-points-routing.module';
import { OverFantasyPointsComponent } from './over-fantasy-points.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    OverFantasyPointsComponent
  ],
  imports: [
    CommonModule,
    OverFantasyPointsRoutingModule
  ],
  providers:[AppLoaderService]

})
export class OverFantasyPointsModule { }
