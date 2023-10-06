import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinedContestDetailsComponent } from './joined-contest-details.component';

const routes: Routes = [{ path: '', component: JoinedContestDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinedContestDetailsRoutingModule { }
