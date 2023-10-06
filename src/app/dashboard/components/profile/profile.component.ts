import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails:any=[];
  wallet:any=[];
  uploadedImage: any;

 constructor(public api : ApiService,private router : Router, private tostr : ToastrService,private loader : AppLoaderService){}

 
 ngOnInit(): void {
  this.loader.open()
    this.api.userFullDetails().subscribe((res:any)=>{
      this.userDetails = res.data;
      console.log(this.userDetails);
    })
    this.api.myWalletDetails().subscribe((res:any)=>{
      this.wallet = res.data;
      this.loader.close()
      console.log(this.wallet, "Wallet");
      
    })
 }
// navigate to transaction page 
 transaction(){
    this.router.navigate(['/dashboard/transaction'])
 }
//  if user is not verified then navigate user to kyc page 
 withdrawbtn(){
  if(this.userDetails.BankVerified==0 || this.userDetails.PanVerified==0  ||this.userDetails.BankVerified==-1 || this.userDetails.PanVerified==-1 ||this.userDetails.BankVerified==2 || this.userDetails.PanVerified==2){
    this.router.navigate(['/dashboard/kyc'])
  }
  // navigate to withdraw page 
 else if(this.userDetails.BankVerified==1 && this.userDetails.PanVerified==1 ){
    this.router.navigate(['/dashboard/withdraw'])
  }
 }
// profile picture uploading 
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
        this.userDetails = res.data;
        console.log(this.userDetails.image,"Image");         
      })
    }else{
      this.tostr.error(res.message)
    }
  })
}
//  logout btn 
 onlogout(){
  localStorage.clear();
  this.tostr.success("Logged Out Successfully....")
  this.router.navigate(['/'])
}
}
