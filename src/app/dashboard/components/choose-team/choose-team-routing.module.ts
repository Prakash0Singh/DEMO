import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseTeamComponent } from './choose-team.component';

const routes: Routes = [{ path: '', component: ChooseTeamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseTeamRoutingModule { }
