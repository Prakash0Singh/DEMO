import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoSettingComponent } from './info-setting.component';

const routes: Routes = [{ path: '', component: InfoSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoSettingRoutingModule { }
