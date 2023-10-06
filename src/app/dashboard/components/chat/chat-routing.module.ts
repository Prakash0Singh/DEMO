import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatMainComponent } from './container/chat-main/chat-main.component';
import { CreateGroupComponent } from './container/create-group/create-group.component';
import { ChatScreenComponent } from './container/chat-screen/chat-screen.component';
import { EditGroupComponent } from './container/edit-group/edit-group.component';
import { GroupDetailComponent } from './container/group-detail/group-detail.component';
import { GroupSettingComponent } from './container/group-setting/group-setting.component';
import { ShareLinkComponent } from './container/share-link/share-link.component';

const routes: Routes = [
  { path: '', component: ChatComponent,
  children: [
      {path : '', redirectTo: 'chat',pathMatch:'full'},
    { path: '',   component: ChatMainComponent },
    { path: 'chat-group',   component: CreateGroupComponent },
    { path: 'chat-screen',   component: ChatScreenComponent },
    { path: 'edit-group',   component: EditGroupComponent },
    { path: 'group-details',   component: GroupDetailComponent },
    { path: 'group-setting',   component: GroupSettingComponent },
    { path: 'share-link',   component: ShareLinkComponent },
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
