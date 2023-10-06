import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointSystemRoutingModule } from './point-system-routing.module';
import { PointSystemComponent } from './point-system.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    PointSystemComponent
  ],
  imports: [
    CommonModule,
    PointSystemRoutingModule
  ],
  providers:[AppLoaderService]

})
export class PointSystemModule { }
