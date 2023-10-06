import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteredContestComponent } from './filtered-contest.component';

const routes: Routes = [{ path: '', component: FilteredContestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilteredContestRoutingModule { }
