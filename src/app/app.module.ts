import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOtpInputModule } from  'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { AppLoaderService } from './dashboard/components/app-loader/app-loader.service';
import { ApiInterceptorService } from './apiinterceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  
} from 'angularx-social-login';
const googleLoginOptions = {
  scope: 'profile email',
  plugin_name:'sample_login' 
};



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgOtpInputModule,
    ToastrModule.forRoot({
      maxOpened:1,
      preventDuplicates: true,
      autoDismiss:true
      }),
      ReactiveFormsModule,
      SocialLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
                      '1061087263343-7jtbu87jsbk7afk5v1eo5gu89lusvbij.apps.googleusercontent.com',
                      googleLoginOptions  
          )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    AppLoaderService,
    
    ],
  bootstrap: [AppComponent]
  }) 
export class AppModule { }
