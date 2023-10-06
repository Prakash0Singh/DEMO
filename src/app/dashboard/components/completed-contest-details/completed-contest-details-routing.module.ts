import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedContestDetailsComponent } from './completed-contest-details.component';

const routes: Routes = [{ path: '', component: CompletedContestDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedContestDetailsRoutingModule { }
