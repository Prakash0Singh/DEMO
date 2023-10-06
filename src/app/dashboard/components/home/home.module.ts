import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CdTimerModule } from 'angular-cd-timer';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLoaderService } from '../app-loader/app-loader.service';
  

@NgModule({
  declarations: [
    HomeComponent,
    CreateProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CdTimerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[DatePipe,AppLoaderService]
})
export class HomeModule { }
