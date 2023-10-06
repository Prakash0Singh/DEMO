import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { AppLoaderService } from '../app-loader/app-loader.service';



@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule
  ],
  providers:[AppLoaderService]

})
export class WalletModule { }
