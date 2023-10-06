import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  userList: any;
  groupID: any;
  checkedID: any = [];
  existingUser: any = [];
  constructor(
    public api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getList();
    this.route.queryParams.subscribe((params: any) => {
      this.groupID = params['groupID'];
    });  
    
    
      if (this.groupID) {
        this.api.joinGroups().subscribe((res: any) => {
          res.data.joinGroupData.filter((x: any) => {
            if (x.groupId == this.groupID) {
              x.approvedRequest.filter((y: any) => {
                this.existingUser.push(y._id);
              });
              x.sendRequest.filter((z: any) => {
                this.existingUser.push(z._id);
              });
              console.log(this.existingUser, 'existingUser');
            }
          });
        });
        
      }
  }

  getList() {
    this.api.userList().subscribe((res: any) => {
      console.log('userlist', res.data.users);
      this.userList = res.data.users;
    });
  }

  query(value: string) {
    let userList = this.userList.filter((user: any) =>
      user.email.includes(value)
    );
    setTimeout(() => {
      this.userList = userList;
    });
    if (!value) {
      this.getList();
    }
  }

  checked(e: any) {
    if (e.target.checked) {
      this.checkedID.push(e.target.value);
    } else {
      this.checkedID.splice(this.checkedID.indexOf(e.target.value), 1);
    }
    console.log(this.checkedID);
  }

  addToGroup() {
    if (this.groupID) {
      console.log('groupid');
      let obj = {
        groupId: this.groupID,
        userId: this.checkedID,
      };
      this.api.AddParticipants(obj).subscribe((res: any) => {
        console.log(res, 'AddParticipants');
        this.router.navigate(['/dashboard/chat/chat-screen'], {
          queryParams: { groupID: this.groupID },
        });
      });
    } else {
      console.log(' else than  groupid');
      localStorage.setItem('checkedID', JSON.stringify(this.checkedID));
      this.router.navigate(['/dashboard/chat/edit-group']);
    }
  }
}
