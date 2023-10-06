import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from '../apiinterceptor.service';


@NgModule({
  declarations: [
    DashboardComponent,
    AppLoaderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  providers:[
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptorService,
    //   multi: true
    // },
  ]
})
export class DashboardModule { }
