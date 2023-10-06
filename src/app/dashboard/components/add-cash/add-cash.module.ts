import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCashRoutingModule } from './add-cash-routing.module';
import { AddCashComponent } from './add-cash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    AddCashComponent
  ],
  imports: [
    CommonModule,
    AddCashRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AppLoaderService]
})
export class AddCashModule { }
