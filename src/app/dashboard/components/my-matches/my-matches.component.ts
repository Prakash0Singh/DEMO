import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit {

  myMatches:any=[];
  myDate:any = new Date();
  lockTime:any=[];
  timeStart:any=[];
  finalDate:any=[];
  upcoming:any=[];
  live:any=[]
  upcomingDate:any=[]
  completed:any=[]
  completedDate:any=[];
  tabMy:any

  constructor(public api : ApiService,private datePipe: DatePipe , private router:Router,private loader : AppLoaderService) {
    this.myDate =this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate=Date.parse(this.myDate)
    console.log(this.myDate,'DATE');
   }

  ngOnInit(): void {
    this.loader.open()
    if(localStorage.getItem("tabMy")){
      this.tabMy = localStorage.getItem("tabMy")
    }else{
      this.tabMy = 'tab1';
    }
    // joined mathced details subscribed from api 
    this.api.newJoinedMatches().subscribe((res:any)=>{
      console.log(res,"JOINED");    
      this.upcoming = res.data;
      this.upcoming.filter((x:any)=>{
          this.upcomingDate.push(Date.parse(x.start_date))
        // else if(x.status==='closed' && (x.final_status==='pending' || x.final_status==='IsReviewed')){
        //   this.live.push(x);
        //   // this.liveDate.push(Date.parse(x.start_date))
        // }
        // else if(x.status==='closed' && (x.final_status==='winnerdeclared' || x.final_status==='IsAbandoned' || x.winnerstatus==='IsCanceled')){
        //   this.completed.push(x);
        //   // this.completedDate.push(Date.parse(x.start_date))
        // }
      })

      // count-down timer
      this.upcomingDate.filter((x:any)=>{
        this.finalDate.push((x - this.myDate)/1000);
      })
      console.log(this.finalDate,"FINAL");

      this.liveMatches();
      this.completedMatches();
    })
  }
// live matches 
  liveMatches(){
    this.api.liveMatches().subscribe((res:any)=>{
      this.live = res.data;
      console.log(this.live,"LIVE");
    })
  }
// completed matches 
  completedMatches(){
    this.api.allCompletedMatches().subscribe((res:any)=>{
      this.completed = res.data;
      this.loader.close()
      console.log(this.completed,"completed");
    })
  }
  liveContestDetails(matchKey:any){
    localStorage.setItem("tabMy",'tab2');   // for active tab status 
    localStorage.setItem("tabLive-comp",'tab1')   // for active tab status 
    this.router.navigate(['dashboard/my-matches/contest'],{queryParams:{matchkey:btoa(matchKey), live:"live"}})
  }
  joinedContestDetails(matchKey:any){
    localStorage.setItem("tabMy",'tab1')   // for active tab status 
    this.router.navigate(['dashboard/joined-contest-details'] ,{queryParams:{matchkey:btoa(matchKey)}})
  }
  completedContestDetails(matchKey:any){
    localStorage.setItem("tabMy",'tab3');   // for active tab status 
    localStorage.setItem("tabLive-comp",'tab1')   // for active tab status 
    this.router.navigate(['dashboard/my-matches/contest'],{queryParams:{matchkey:btoa(matchKey)}})
    // this.router.navigate(['dashboard/completed-contest-details'])
  }

  changeTab(tab:any){
    // console.log(tab,"CHANGE TABS");    
    localStorage.setItem("tabMy",tab)
  }

  onBack(){
    window.history.go(-1)
  }
}
