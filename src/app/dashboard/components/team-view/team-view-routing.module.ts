import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamViewComponent } from './team-view.component';

const routes: Routes = [{ path: '', component: TeamViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamViewRoutingModule { }
