import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreComponent } from './more.component';
import { ContactComponent } from './contact/contact.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AboutComponent } from './about/about.component';
import { LegalityComponent } from './legality/legality.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PartnerProgramComponent } from './partner-program/partner-program.component';
import { RulesRegulationsComponent } from './rules-regulations/rules-regulations.component';

const routes: Routes = [
  { path: '', component: MoreComponent },
  {path:'contact-us',component:ContactComponent},
  {path:'terms-contitions',component:TermsConditionsComponent},
  {path:'rules-regulations',component:RulesRegulationsComponent},
  {path:'about-us',component:AboutComponent},
  {path:'legality',component:LegalityComponent},
  {path:'privacy-policy',component:PrivacyPolicyComponent},
  {path:'partner-program',component:PartnerProgramComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule { }
