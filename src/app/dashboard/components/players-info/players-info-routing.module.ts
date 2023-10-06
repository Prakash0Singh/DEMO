import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersInfoComponent } from './players-info.component';

const routes: Routes = [{ path: '', component: PlayersInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersInfoRoutingModule { }
