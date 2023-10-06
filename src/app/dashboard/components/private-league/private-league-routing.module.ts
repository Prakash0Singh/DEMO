import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLeagueComponent } from './private-league.component';

const routes: Routes = [{ path: '', component: PrivateLeagueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateLeagueRoutingModule { }
