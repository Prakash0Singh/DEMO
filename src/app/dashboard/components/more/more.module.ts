import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more.component';
import { ContactComponent } from './contact/contact.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AboutComponent } from './about/about.component';
import { LegalityComponent } from './legality/legality.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PartnerProgramComponent } from './partner-program/partner-program.component';
import { AppLoaderService } from '../app-loader/app-loader.service';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';



@NgModule({
  declarations: [
    MoreComponent,
    ContactComponent,
    TermsConditionsComponent,
    AboutComponent,
    LegalityComponent,
    PrivacyPolicyComponent,
    PartnerProgramComponent,
    RulesRegulationsComponent
  ],
  imports: [
    CommonModule,
    MoreRoutingModule
  ],
  providers:[AppLoaderService]
})
export class MoreModule { }
