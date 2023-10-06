import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-info-setting',
  templateUrl: './info-setting.component.html',
  styleUrls: ['./info-setting.component.scss']
})
export class InfoSettingComponent implements OnInit {

  userDetails:any=[];
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0];

  constructor(private fb : FormBuilder,private api : ApiService,private datePipe : DatePipe, private tostr : ToastrService,private loader : AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    this.api.userFullDetails().subscribe((res:any)=>{
      this.userDetails=res.data,
      this.loader.close()
      console.log(this.userDetails,"RESponse");
      // patch user details from api 
      this.update.patchValue({
        team:this.userDetails.team,
        email:this.userDetails.email,
        mobile:this.userDetails.mobile,
        pincode:this.userDetails.pincode,
        gender:this.userDetails.gender,
        dob:this.datePipe.transform(this.userDetails.dob,'yyyy-MM-dd'),
        state:this.userDetails.state,
        address:this.userDetails.address
      })
    })
  }

  // form creation 
  update = this.fb.group({
    team:[''],
    email:[''],
    mobile:[''],
    pincode:[''],
    gender:[''],
    dob:[''],
    state:[{value: '', disabled: this.userDetails.statefreeze == 1},],
    address:[''],
  })

  onKey(evt:any){
      evt.preventDefault();
  }
// submition function 
  submit(){
    let obj={
      email:this.update.value.email,
      mobile:this.update.value.mobile,
      pincode:this.update.value.pincode,
      gender:this.update.value.gender,
      dob:this.update.value.dob,
      state:this.update.value.state,
      address:this.update.value.address

    }
    // let data = this.update.value
    this.api.editprofile(obj).subscribe((res:any)=>{
      console.log(res,"ASDFGH");
      if(res.success==true){
        this.tostr.success(res.message);
        setTimeout(function(){
          window.location.reload();
       }, 500);
      }else{
        this.tostr.error(res.message)
      }
    })
  }
}
