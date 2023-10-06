import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
})
export class EditGroupComponent implements OnInit {
  groupIds: any;
  groupId: any;
  uploadedImage: any;
  image1: any = '';
  groupName: any;
  textarea = 0;
  maxInput = 0;

  constructor(
    public api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('checkedID')) {
      this.groupIds = JSON.parse(localStorage.getItem('checkedID') || '[]');
      console.log(this.groupIds, 'groupIds');
    } else if (!localStorage.getItem('checkedID')) {
      window.history.go(-1);
      // this.router.navigate(['/dashboard/chat/chat-group']);
    }
  }
  editForm = this.fb.group({
    groupName: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
  });

  get fc() {
    return this.editForm.controls;
  }
  creategroup() {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.groupName = this.editForm.value.groupName;
      console.log(this.editForm.value, 'editForm');
      let imageFormData: FormData = new FormData();
      imageFormData.append('typename', 'uploads');
      imageFormData.append('image', this.uploadedImage);
      imageFormData.append('groupName', this.groupName);
      this.groupIds.forEach((items: any) =>
        imageFormData.append('requestedUserId', items)
      );
      // const arr =  imageFormData.get("requestedUserId");

      // console.log(this.image1, 'uploaded');

      // if(this.uploadedImage){
      // var obj :any= {
      //   groupName: this.editForm.value.groupName,
      //   requestedUserId: this.groupIds,
      //   image: this.editForm.value.image,
      // };
      // }
      this.api.createGroup(imageFormData).subscribe((res: any) => {
        if (res.success) {
          console.log(res.data._id, 'createGroup');
          this.groupId = res.data._id;
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard/chat/chat-screen'], {
            queryParams: { groupID: this.groupId },
          });
          localStorage.removeItem('checkedID');
        } else {
          this.toastr.error(res.message);
        }
      });
    } else if (!this.uploadedImage) {
      this.toastr.error("Please upload an image")
    }
  }

  image(evt: any) {
    this.uploadedImage = evt.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => {
      this.image1 = reader.result;
    };
  }

  inputlength(value: string) {
    this.maxInput = value.length;
  }
  textlength(value: string) {
    this.textarea = value.length;
  }
}
