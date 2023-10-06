import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCashComponent } from './add-cash.component';

const routes: Routes = [{ path: '', component: AddCashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCashRoutingModule { }
