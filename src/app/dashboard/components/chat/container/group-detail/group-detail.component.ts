import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
  groupid: any;
  joinGroupData: any = [];
  chatdata: any = [];
  admindata: any = [];
  userDetail: any = [];
  userName: any;
  userid: any;
  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.groupid = params['groupID'];
    });

    this.joinGroup()
    this.api.userFullDetails().subscribe((res: any) => {
      console.log(res, 'user details api response ');
      this.userDetail = res.data;
    });
  }

  joinGroup() {
    this.api.joinGroups().subscribe((res: any) => {
      this.joinGroupData = res.data.joinGroupData;
      console.log(res.data.joinGroupData, 'joined groups chat screen ');
      this.joinGroupData.filter((x: any) => {
        if (this.groupid == x.groupId) {
          this.chatdata = x;
          this.admindata=[]
          x.adminData.filter((y: any) => {
            this.admindata.push(y._id)
          })
        }
      });
      console.log(this.chatdata);
      console.log(this.admindata, 'admindata');
    });
  }
  sharelink() {
    this.router.navigate(['/dashboard/chat/share-link'], {
      queryParams: { groupID: this.groupid },
    });
  }

  addParticipant() {
    this.router.navigate(['/dashboard/chat/chat-group'], {
      queryParams: { groupID: this.groupid },
    });
  }
  exitGroup(){
    this.api.exitGroup(this.groupid).subscribe((res:any)=>{
      console.log(res, 'exit group');
      if(res.success){
        this.toastr.success(res.message)
        this.router.navigate(['/dashboard/chat/']);
      }
      else{
        this.toastr.error(res.message)
      }
    })
  }
  get(details: any) {
    this.userid = details._id;
    this.userName = details.team;
  }

  makeAdmin(role: any) {
    if (role == 'admin') {
      let data = {
        groupId: this.groupid,
        userId: this.userid,
      };
      this.api.makeAdmin(data).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.toastr.success(res.message)
          this.joinGroup();
        }
        else {
          this.toastr.error(res.message)
        }
      });
    }
    else if (role == 'remove') {
      this.api.removeParticipants(this.groupid, this.userid).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message)
        },
        complete: () => {
          setTimeout(() => {
            this.joinGroup();
           console.log( this.admindata);
           
          }, 8000);
        },
        error:(err:any)=>{
          this.toastr.error(err.message)

        }
      });
      // this.api.removeParticipants(this.groupid, this.userid).subscribe((res: any) => {
      //   console.log(res);
      //   if (res.success) {
      //     this.joinGroup();
      //     this.toastr.success(res.message)
      //   }
      //   else {
      //     this.toastr.error(res.message)
      //   }
      // })
    }
    else if(role=='remove admin'){
      this.api.removeAdmin(this.groupid, this.userid).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.joinGroup();
          this.toastr.success(res.message)
        }
        else {
          this.toastr.error(res.message)
        }
      })
    }
  }
}
