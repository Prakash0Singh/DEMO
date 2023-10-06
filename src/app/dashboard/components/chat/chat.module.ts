import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatMainComponent } from './container/chat-main/chat-main.component';
import { CreateGroupComponent } from './container/create-group/create-group.component';
import { ChatScreenComponent } from './container/chat-screen/chat-screen.component';
import { EditGroupComponent } from './container/edit-group/edit-group.component';
import { GroupDetailComponent } from './container/group-detail/group-detail.component';
import { GroupSettingComponent } from './container/group-setting/group-setting.component';
import { ShareLinkComponent } from './container/share-link/share-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    ChatComponent,
    ChatMainComponent,
    CreateGroupComponent,
    ChatScreenComponent,
    EditGroupComponent,
    GroupDetailComponent,
    GroupSettingComponent,
    ShareLinkComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ]
})
export class ChatModule { }
