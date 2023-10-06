import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-private-league',
  templateUrl: './private-league.component.html',
  styleUrls: ['./private-league.component.scss']
})
export class PrivateLeagueComponent implements OnInit {
  matchkey:any;
  upcoming:any=[]
  match:any=[];
  myDate:any = new Date();
  timeStart:any;
  finalDate:any;
  contestSize:any;
  totalTeams:any;
  value:any=0;
  percent=18/100;
  temp:any;
  multiCheck:any;
  myTeams:any=[];
  challengeid:any=[];
  usableBalanceArr:any=[]
  joinTeamId: any;

  constructor(private route : ActivatedRoute, private api : ApiService , private datePipe: DatePipe,private fb : FormBuilder,private tostr:ToastrService,private router : Router,private loader : AppLoaderService) {
    this.myDate =this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate=Date.parse(this.myDate)
    console.log(this.myDate,'DATE');
  }

  privateContest = this.fb.group({
    name:['',[Validators.required]],
    winning:['',[Validators.required]],
    teams:['',[Validators.required]],
    check:[],
  })

  get f(){
    return this.privateContest.controls
  }

  referCode = this.fb.group({
    code:['',Validators.required]
  })

  get f2(){
    return this.referCode.controls
  }

  ngOnInit(): void {
    this.loader.open()
    this.route.queryParams.subscribe((params:any)=>{
      this.matchkey = atob(params['matchkey'])
      console.log(this.matchkey,"MATCHKEY");        
    })

    this.api.getMatchlist().subscribe((res:any)=>{     
      this.upcoming = res.data.upcomingMatches
      console.log(this.upcoming,"RESPONSE");
      this.upcoming.filter((x:any)=>{        
        if(x.id == this.matchkey){          
          this.match = x;
          console.log(this.match,"MATCH");    
          this.timeStart = Date.parse(x.time_start); 
          console.log(this.timeStart,"START");
          this.finalDate = (this.timeStart - this.myDate)/1000;
          console.log(this.finalDate,"FINAL");
        }
      })
      this.myteams()
    })
  }

  myteams(){
    this.api.getMyTeams(this.matchkey).subscribe((res:any)=>{
      this.myTeams=res.data;
      this.loader.close()
      console.log(res.data,"TEAMS");
      this.joinTeamId=this.myTeams[0].jointeamid
    })
  }
// only number validation 
  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  // calculation for counting win prize 
  calculate(evt:any,d:any){
    if(d==='winning'){
      this.contestSize=evt.target.value;
    }else if(d==='teams'){
      this.totalTeams=evt.target.value;
    }
    this.temp=(this.percent*this.contestSize)+Number(this.contestSize)
    this.value = this.temp/this.totalTeams;
    this.value = this.value.toFixed(2)
  }
//  submission process 
  onSubmit(){
    if(this.privateContest.valid){
      console.log(this.privateContest.value,"VALUEEE");
      if(this.privateContest.value.check == null || this.privateContest.value.check == false){
        this.multiCheck=0
      }else{
        this.multiCheck=1
      }

      let data={
        matchkey:this.matchkey,
        maximum_user:this.privateContest.value.teams,
        win_amount:this.privateContest.value.winning,
        entryfee:this.value,
        multi_entry:this.multiCheck,
        contestName:this.privateContest.value.name,
      }

      this.api.privateContest(data).subscribe((res:any)=>{
        console.log(res,"RESPONSE");
        
        if(res.status==true){
          // this.router.navigate(['/dashboard/upcoming-contest'],{queryParams:{matchkey:btoa(this.matchkey)}})

          //  if user don't have any team then navigate to create team page 
          if(this.myTeams.length==0){
            this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchkey), challengeid:btoa(res.data.matchchallengeid) } })
          }
          // if user have one team then open modal to join the contest 
          else if(this.myTeams.length==1){
            this.tostr.success(res.message);
            document.getElementById("openModal")?.click();
            this.join(res.data);
          }
          // if user have created more than 1 team then navigate  to choose team component 
          else if(this.myTeams.length>1){
            this.tostr.success(res.message);
            this.router.navigate(['/dashboard/choose-team'],{queryParams:{matchkey: btoa(this.matchkey) , challengeid: btoa(res.data.matchchallengeid)}}) 
          }
        }else{
          this.tostr.error(res.message)
        }
      })
    }
    this.privateContest.markAllAsTouched();
  }

  // show usable balance 
  join(d:any){
    console.log(d,"DETAILSSS");  
    this.challengeid = d.matchchallengeid;
    this.api.getUsableBalance(d.matchchallengeid,1).subscribe((res:any)=>{
      console.log(res, 'getUsableBalance');
      this.usableBalanceArr=res.data
    })
  }


  joincontest(){
    // if user don't have enough money to join contest then show error message 
    if (Number(this.usableBalanceArr.entryfee) > Number(this.usableBalanceArr.usablebalance)){
      this.tostr.error('add enough balance') 
      this.router.navigate(['/dashboard/add-cash']) 
      }
      // if user have enough money then join the contest 
      else if(Number(this.usableBalanceArr.entryfee) <= Number(this.usableBalanceArr.usablebalance)){
        let obj = {
          matchchallengeid:this.challengeid,
          jointeamid: this.joinTeamId
        };
        this.api.joinContest(obj).subscribe((res: any) => {
          if(res.success ==true){
            this.tostr.success(res.message)
            setTimeout(()=>{
              window.location.reload();
            },1000)
            // this.router.navigate(['/dashboard/upcoming-contest'], { queryParams: { matchkey :  btoa(this.matchKey) } })
          }
          else{
            this.tostr.error(res.message)
            }
        }, err=>{
          this.tostr.error(err.message)
        })
  
      }
  }

  // refer code 
  onRefer(){
    if(this.referCode.valid){
      console.log(this.referCode.value,"REFERER CODE");
      let data={
        getcode:this.referCode.value.code,
        matchkey:this.matchkey,
      }

      // join contest by  refer code function 
      this.api.joinByCode(data).subscribe((res:any)=>{
        console.log(res,"RESPONSE");
        if(res.status==true){
          // this.tostr.success(res.message);
          // this.router.navigate(['/dashboard/upcoming-contest'],{queryParams:{matchkey:btoa(this.matchkey)}})
          if(this.myTeams.length==0){
            this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchkey), challengeid:btoa(res.data.matchchallengeid) } })
          }
          else if(this.myTeams.length==1){
            this.tostr.success(res.message);
            document.getElementById("openModal")?.click();
            this.join(res.data);
          }
          else if(this.myTeams.length>1){
            this.tostr.success(res.message);
            this.router.navigate(['/dashboard/choose-team'],{queryParams:{matchkey: btoa(this.matchkey) , challengeid: btoa(res.data.matchchallengeid)}}) 
          }
        }else{
          this.tostr.error(res.message);
        }
      })
    }
    this.referCode.markAllAsTouched()
  }
  onBack(){
    window.history.go(-1)
  }
}
