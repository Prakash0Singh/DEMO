import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerInfoComponent } from './player-info.component';

const routes: Routes = [{ path: '', component: PlayerInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerInfoRoutingModule { }
