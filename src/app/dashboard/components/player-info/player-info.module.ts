import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerInfoRoutingModule } from './player-info-routing.module';
import { PlayerInfoComponent } from './player-info.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    PlayerInfoComponent
  ],
  imports: [
    CommonModule,
    PlayerInfoRoutingModule
  ],
  providers:[AppLoaderService]

})
export class PlayerInfoModule { }
