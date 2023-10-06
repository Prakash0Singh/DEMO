import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverFantasyPointsComponent } from './over-fantasy-points.component';

const routes: Routes = [{ path: '', component: OverFantasyPointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverFantasyPointsRoutingModule { }
