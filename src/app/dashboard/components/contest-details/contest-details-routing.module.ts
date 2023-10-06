import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestDetailsComponent } from './contest-details.component';

const routes: Routes = [{ path: '', component: ContestDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestDetailsRoutingModule { }
