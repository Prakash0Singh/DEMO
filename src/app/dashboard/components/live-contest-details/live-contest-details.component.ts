import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-live-contest-details',
  templateUrl: './live-contest-details.component.html',
  styleUrls: ['./live-contest-details.component.scss']
})
export class LiveContestDetailsComponent implements OnInit {
  matchKey: any;
  joinedContest:any=[];
  teams:any=[];
  status:any;
  scorecardArr: any=[]
  completed: any=[]
  userdetail: any=[]
  liveScorecard:any=[];
  team1:any=[];
  team2:any=[];
  matchStatus:any;
  tabLive: any;
  newData: any=[];

  constructor(private router:Router , private route:ActivatedRoute, public api:ApiService,private loader : AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    // for active tab status 
    if(localStorage.getItem("tabLive-comp")){
      this.tabLive = localStorage.getItem("tabLive-comp")
    }else{
      this.tabLive = 'tab1';
    }
    this.route.queryParams.subscribe((params: any) => {
      this.matchKey = atob(params['matchkey']);
      this.matchStatus = params['live']
      console.log(this.matchKey, 'MATCH KEY');
    });


    this.matchlivescore()
    // live match detials 
    if(this.matchStatus == 'live'){
      this.api.liveMatches().subscribe((res:any)=>{
        res.data.filter((x:any)=>{
          if(x.matchkey==this.matchKey){
            this.completed=x
          }
        })
      })
    }else{
      // completed mathces details 
      this.api.allCompletedMatches().subscribe((res:any)=>{
        res.data.filter((x:any)=>{
          if(x.matchkey==this.matchKey){
            this.completed=x
          }
        })
        // console.log(this.completed, 'matcharr');
      })
    }

    // user full details 
    this.api.userFullDetails().subscribe((res:any)=>{
      // console.log(res,'userfulldetails');
      this.userdetail=res.data
    })
    this.api.myJoinedContest(this.matchKey).subscribe((res:any)=>{
      console.log(res,'niujiuhinuh');
      this.joinedContest = res.data;
      this.joinedContest.filter((x:any)=>{
        x.value = 0;
        x.value = x.joinedusers / x.maximum_user * 100

      })
      this.loader.close()
      // status of match 
      if(this.joinedContest.length>0){
        this.status = this.joinedContest[0].matchFinalstatus
        if(this.status == "pending"){
          this.status = "In Progress"
        }
        else if(this.status == "IsReviewed"){
          this.status = "Under Review"
        }
      }
      this.myteams()
      this.scorecard()
    })
  }
//  user team details 
  myteams(){
    this.api.getMyTeams(this.matchKey).subscribe((res:any)=>{
      console.log(res,"TEAMS");
      this.teams = res.data

      this.teams.filter((x: any) => {
        let team1Obj:any={
          't1':[],
          't2':[],
          'wk':[],
          'bat':[],
          'ar':[],
          'bow':[]
        };
        x.player.filter((y: any) => {
          if (y.team == x.team1Id) {
            team1Obj['t1'].push(y.team)
          }
          if (y.team == x.team2Id) {
            team1Obj['t2'].push(y.team)
          } 
          if(y.role=='keeper'){
            team1Obj['wk'].push(y)
          }
          if(y.role=='batsman'){
            team1Obj['bat'].push(y)
          }
          if(y.role=='allrounder'){
            team1Obj['ar'].push(y)
          }
          if(y.role=='bowler'){
            team1Obj['bow'].push(y)
          }
        })
        this.newData.push(team1Obj);
        
      })
      
      console.log("this.newData",this.newData);
    })
  }

  changeTab(tab:any){
    // console.log(tab,"CHANGE TABS");    
    localStorage.setItem("tabLive-comp",tab)
  }
//  score card 
  scorecard(){
    this.api.getlivescores(this.matchKey).subscribe((res:any)=>{
      console.log(res, 'scorecard');
      this.scorecardArr.push(res.data)
      
    })
  }

  leaderBoard(d:any){
    localStorage.setItem("tabLive-comp",'tab1');
    localStorage.setItem("tabComp",'tab2')
    console.log(d.matchchallengeid,'matchchallengeid');
    this.router.navigate(['dashboard/my-matches/contest-details'],{queryParams:{matchkey:btoa(this.matchKey) , matchchallengeid:btoa(d.matchchallengeid),live:this.matchStatus}})
  }

  // navigate to view team page 
  viewTeam(d:any){
    localStorage.setItem("tabLive-comp",'tab2')
    this.router.navigate(['/dashboard/team-view'] ,{queryParams:{matchkey: btoa(this.matchKey) , teamId:btoa(d.jointeamid) , teamNumber :btoa(d.teamnumber) , mymatches:"team"}})
  }

  // live scores or matches 
  matchlivescore(){
    this.api.matchlivescore(this.matchKey).subscribe((res:any)=>{
      this.liveScorecard = res.data
      console.log(this.liveScorecard, 'matchlivescore');
      // this.team1 = this.liveScorecard[0];
      // this.team2 = this.liveScorecard[1];
    })
  }
}
