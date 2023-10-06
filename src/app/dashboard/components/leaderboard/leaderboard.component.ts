import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  leaderboard:any=[];
  series:any=[];
  userInfo:any=[];
  toppers:any=[];
  price:any=[]
  constructor(public api : ApiService,private loader : AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    this.api.getAllSeries().subscribe((res:any)=>{
      this.series = res.data
      this.price=this.series[0].price_card
      console.log(this.price,"PRICE");    
      console.log(this.series,"RESPONSE");
      this.leader();
      this.userdetails()
    })
  }
  
  // get leader board details  from api 
  leader(){
    this.api.getLeaderboard(this.series[0].id).subscribe((res:any)=>{
      this.leaderboard = res.data
      console.log(this.leaderboard,"FIRST LEADER");     
      this.leaderboard.filter((x:any)=>{
        if(x.rank>0 && x.rank<4){
          this.toppers.push(x);
        }
      }) 
      console.log(this.toppers,"TABLE TOPPERS");
      
    })
  }

  //  user details 
  userdetails(){
    this.api.userFullDetails().subscribe((res:any)=>{
      this.userInfo = res.data
      this.loader.close()
    })
  }

  // chnage event 
  onChnage(evt:any){
    this.toppers=[]
    this.leaderboard=[]
    console.log(evt.target.value,"EVENT");
    this.api.getLeaderboard(evt.target.value).subscribe((res:any)=>{
      this.leaderboard = res.data;
      console.log(this.leaderboard,"LEADERBOARD");
      this.leaderboard.filter((x:any)=>{
        if(x.rank>0 && x.rank<4){
          this.toppers.push(x);
        }
      })
      
      this.series.filter((x:any)=>{
        if(evt.target.value==x.id){
          this.price=x.price_card
        }
      })
    })
  }


}
