import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class NotificationModule { }
