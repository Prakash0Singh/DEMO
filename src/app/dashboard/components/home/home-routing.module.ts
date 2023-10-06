import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

const routes: Routes = [{ path: '', component: HomeComponent },{path:'create-profile',component:CreateProfileComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
