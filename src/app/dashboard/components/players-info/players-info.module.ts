import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersInfoRoutingModule } from './players-info-routing.module';
import { PlayersInfoComponent } from './players-info.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    PlayersInfoComponent
  ],
  imports: [
    CommonModule,
    PlayersInfoRoutingModule
  ],
  providers:[AppLoaderService]

})
export class PlayersInfoModule { }
