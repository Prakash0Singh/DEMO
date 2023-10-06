import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingContestComponent } from './upcoming-contest.component';

const routes: Routes = [{ path: '', component: UpcomingContestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcomingContestRoutingModule { }
