import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';
import { MaterialModule } from '../../material.module';
import { AppLoaderService } from '../app-loader/app-loader.service';


@NgModule({
  declarations: [
    InviteComponent
  ],
  imports: [
    CommonModule,
    InviteRoutingModule,
    MaterialModule
  ],
  providers:[AppLoaderService]

})
export class InviteModule { }
