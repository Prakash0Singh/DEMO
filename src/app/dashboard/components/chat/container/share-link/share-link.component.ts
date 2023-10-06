import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent implements OnInit {
  groupid:any
  joinGroupData:any=[]
  chatdata:any=[]
  originPath:any
  link:any
  constructor(private route:ActivatedRoute , public api:ApiService) { }

  ngOnInit(): void {
    console.log(window);
    console.log(window.location.origin,'href');
this.originPath= window.location.origin
this.route.queryParams.subscribe((params: any) => {
  this.groupid = params['groupID']
})
// this.share()


    this.api.joinGroups().subscribe((res: any) => {
      this.joinGroupData = res.data.joinGroupData;
      console.log(res.data.joinGroupData, 'joined groups chat screen ');
      this.joinGroupData.filter((x: any) => {
        if (this.groupid == x.groupId) {
        this.chatdata=(x)
      }
        });
        console.log(this.chatdata , 'chat data');
    });
  }
  // ['/dashboard/chat/chat-screen' ],{queryParams:{groupID:groupId }}
  share(){
    this.link=`${this.originPath}/dashboard/chat/chat-screen?groupID=${this.groupid}`
    console.log(this.link);
  }
}
