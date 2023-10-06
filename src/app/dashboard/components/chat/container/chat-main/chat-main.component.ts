import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss']
})
export class ChatMainComponent implements OnInit {
joinGroupData:any;
userDetail:any=[]
requestData: any;
wallet:any=[]
uploadedImage:any

  constructor( public api:ApiService , private router:Router , private tostr:ToastrService) { }


  ngOnInit(): void {
    this.api.joinGroups().subscribe((res:any)=>{
      if(res.success){
        this.joinGroupData=res.data.joinGroupData
        console.log(res.data.joinGroupData, 'joined groups ');
      }
      else{
       this.joinGroupData=''
      }
    })

    this.api.request().subscribe((res:any)=>{
      if(res.success){
        this.requestData=res.data.request
        console.log(this.requestData, 'requestData ');
      }
      else {
        this.requestData=''
      }

    })


    this.api.userFullDetails().subscribe((res:any)=>{
      console.log(res, 'user details api response ');
      this.userDetail = res.data;})


      this.api.myWalletDetails().subscribe((res:any)=>{
        this.wallet = res.data;
      })
  }



  chatScreen(groupId:any){
console.log(groupId,'groupID');
this.router.navigate(['/dashboard/chat/chat-screen' ],{queryParams:{groupID:groupId }})
  }

  imgUp(evt:any){
    console.log(evt.target.files[0],"EVENT")
    this.uploadedImage = evt.target.files[0];

    let imageFormData:FormData = new FormData();
    imageFormData.append('typename','uploads');
    imageFormData.append('image',this.uploadedImage);

    this.api.imageUpload(imageFormData).subscribe((res:any)=>{
      console.log(res,"IMAGEEEE");
      if(res.success == true){
        this.tostr.success(res.message)
        this.api.userFullDetails().subscribe((res:any)=>{
          console.log(res, 'user details api response ');
          this.userDetail = res.data;
          console.log(this.userDetail.image,"Image");         
        })
      }else{
        this.tostr.error(res.message)
      }
    })
  }
}
