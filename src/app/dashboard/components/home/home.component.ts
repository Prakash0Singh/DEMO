import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  upcoming:any=[];
  joined:any=[]
  banner:any=[];
  newData:any=[];
  myDate:any = new Date();
  lockTime:any=[];
  timeStart:any=[];
  finalDate:any=[];
  status=true
  userDetail:any=[];
  wallet:any=[];
  uploadedImage: any;
  finalDate2: any=[];
  timeStart2: any=[];
  lockTime2: any=[];

  
  constructor(public api : ApiService,private datePipe: DatePipe,private router : Router,private tostr : ToastrService, private loader : AppLoaderService) {
    this.myDate =this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate=Date.parse(this.myDate)
    console.log(this.myDate,'DATE');
    this.api.userFullDetails().subscribe((res:any)=>{
      console.log(res, 'user details api response ');
      this.userDetail = res.data;
      if(this.userDetail.team==''&& this.userDetail.state==''&& this.userDetail.dob==''){
        this.router.navigateByUrl('dashboard/home/create-profile')
      }
      else{
        this.router.navigateByUrl('/dashboard/home')
      }
    })
   }

// scroll event 
   @HostListener('window:scroll')
   checkScroll() {
     const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
     if(scrollPosition > 450){
       console.log(scrollPosition);

     }
   }


  ngOnInit(): void {
     this.loader.open()
    //  get matchlist
     this.api.getMatchlist().subscribe((res:any)=>{
       this.upcoming = res.data.upcomingMatches
       this.joined = res.data.joinedMatches
       this.loader.close();
       console.log(res.data,"RESPONSE");
      this.upcoming.filter((x:any)=>{
        // this.lockTime.push(Date.parse(x.locktime));
        this.timeStart.push(Date.parse(x.time_start));
      })
      // console.log(this.lockTime,"LOCK");
      console.log(this.timeStart,"START");
      
      this.timeStart.filter((x:any)=>{
        this.finalDate.push((x - this.myDate)/1000);
      })
      console.log(this.finalDate,"FINAL");

      this.joined.filter((x:any)=>{
        // this.lockTime2.push(Date.parse(x.locktime));
        this.timeStart2.push(Date.parse(x.start_date));
      })
      // console.log(this.lockTime2,"LOCK   2");
      console.log(this.timeStart2,"START  2");
      
      this.timeStart2.filter((x:any)=>{
        this.finalDate2.push((x - this.myDate)/1000);
      })
      console.log(this.finalDate2,"FINAL");
    })
// banners
    this.api.getMainBanner().subscribe((res:any)=>{
      this.banner = res.data;
      console.log(this.banner,"BANNER");
    })

    this.api.myWalletDetails().subscribe((res:any)=>{
      this.wallet = res.data;
    })
 
  }
// event on banner
  onBanner(b:any){
    this.banner.filter((x:any)=>{
      if(b==="add_cash" && x.url==""){
        this.router.navigate(['/dashboard/add-cash'])
      }else if(x.url!="" && b==x.bannerType){
        this.router.navigate([x.url])
      }
      else if(b==="invite" && x.url==""){
        this.router.navigate(['/dashboard/invite'])
      }
    })
  }
  
// card click event 
  onCard(id:any){
    console.log(id,"IDDD");
    localStorage.setItem("tabUp",'tab1')
    this.router.navigate(['/dashboard/upcoming-contest'],{queryParams:{matchkey:btoa(id)}})
  }

// logout btn 
  onlogout(){
    localStorage.clear();
    this.router.navigate(['/'])
    this.tostr.success("Logged Out Successfully....")
  }
  
// image uploading for profile picture
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
      
  joinedContestDetails(matchKey:any,time:any){
    console.log(time,"TIMEE");
    if(time>0){
      this.router.navigate(['dashboard/joined-contest-details'] ,{queryParams:{matchkey:btoa(matchKey)}})
    }
    else if(time<0){
      this.router.navigate(['dashboard/my-matches/contest'],{queryParams:{matchkey:btoa(matchKey), live:"live"}})
    }
  }

}
