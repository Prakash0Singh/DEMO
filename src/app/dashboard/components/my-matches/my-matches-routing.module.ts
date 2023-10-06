import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMatchesComponent } from './my-matches.component';

const routes: Routes = [{ path: '', component: MyMatchesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMatchesRoutingModule { }
