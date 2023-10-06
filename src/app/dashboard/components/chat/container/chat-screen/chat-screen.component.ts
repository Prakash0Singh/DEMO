import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss'],
})
export class ChatScreenComponent implements OnInit {
  groupid: any;
  joinGroupData: any = [];
  chatdata: any;
  requestedData: any;
  userDetail: any;
  requested!: boolean;
  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.groupid = params['groupID'];
    });
    this.getUserId();

  }

  getUserId() {
    this.api.userFullDetails().subscribe({
      next: (res: any) => {
        this.userDetail = res.data.id;
      },
      complete: () => {
        this.reqDetails();
      },
    });
  }

  reqDetails() {
      this.api.joinGroups().subscribe({
        next: (res: any) => {
          if (res.success) {
            this.joinGroupData = res.data.joinGroupData;
            res.data.joinGroupData.filter((x: any) => {
              if (this.groupid == x.groupId) {
                this.chatdata = x;                
              }
            });
          } else {
            this.joinGroupData = [];
          }
        },
         complete: () => {
          if (!this.chatdata) {
            console.log("id doesn't exist in join group");
            this.api.request().subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.joinGroupData = res.data.request;
                  res.data.request.filter((x: any) => {
                    if (this.groupid == x.groupId) {
                      this.requestedData = x;
                    }
                  });
                } else {
                  this.joinGroupData = [];
                }
              }, 
              complete: () => {
                if(!this.requestedData && !this.chatdata){
                  console.log('sahrelink ');
                  
                  // share link //// 
                  let obj ={
                    groupId:this.groupid }
                    this.api.shareLink(obj).subscribe((res:any)=>{ 
                      console.log(res); 
                      if(res.succes){
                        this.getUserId()
                      }
                    })
                    
                  }
                       },
            });
          }
                  },
      });
   
   
  }

  groupstng() {
    this.router.navigate(['/dashboard/chat/group-details'], {
      queryParams: { groupID: this.groupid },
    });
  }

  request(status: any) {
    let obj = {
      action: status,
      groupId: this.groupid,
    };
    this.api.userRequestAction(obj).subscribe((res: any) => {
      console.log(res, 'userRequestAction');
      if (res.status) {
        this.toastr.success(res.message);
        window.location.reload();
      } else if (!res.status) {
        this.toastr.error(res.message);
      }
    });
  }
}
