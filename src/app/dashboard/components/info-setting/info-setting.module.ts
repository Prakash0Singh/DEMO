import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InfoSettingRoutingModule } from './info-setting-routing.module';
import { InfoSettingComponent } from './info-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    InfoSettingComponent
  ],
  imports: [
    CommonModule,
    InfoSettingRoutingModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class InfoSettingModule { }
