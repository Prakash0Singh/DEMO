import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveContestDetailsComponent } from './live-contest-details.component';

const routes: Routes = [{ path: '', component: LiveContestDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveContestDetailsRoutingModule { }
