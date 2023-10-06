import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PlayersInfoComponent } from '../players-info/players-info.component';

@Component({
  selector: 'app-select-captain',
  templateUrl: './select-captain.component.html',
  styleUrls: ['./select-captain.component.scss']
})
export class SelectCaptainComponent implements OnInit, OnDestroy {
  matchKey: any;
  team: any = []
  BAT: any = []
  WK: any = []
  BOWL: any = []
  AR: any = []
  viceCaptain: any = [];
  captain: any = [];
  match: any = [];
  myDate: any = new Date();
  timeStart: any;
  finalDate: any;
  upcoming: any = []
  players: any = []
  teamnumber: any;
  myTeams: any = []
  challengeId: any;
  joinTeamId: any;
  usableBalanceArr: any = [];
  userDetails: any = []

  constructor(public api: ApiService, private datePipe: DatePipe, private toastr: ToastrService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate = Date.parse(this.myDate)
    console.log(this.myDate, 'DATE');

  }

  ngOnInit(): void {
    console.log('jjjjj');
    if (!localStorage.getItem('matchKey')) {
      window.history.go(-1)
      return
    }
    // subscribe to params 
    this.route.queryParams.subscribe((params) => {
      if (params['challengeid']) {
        this.challengeId = atob(params['challengeid'])
        console.log(this.challengeId, "Challenge ID");
      }
      this.teamnumber = params['teamnumber'];
      console.log(this.teamnumber, 'teamnumber');
      console.log(this.teamnumber == undefined, 'teamnumber==undefined');
    });
    this.matchKey = localStorage.getItem('matchKey');
    this.team = JSON.parse(localStorage.getItem('team') || '{}')
    console.log(this.team, 'team');
    this.getMatchList();
    this.userInfo();

    // filtering roles of team 
    this.team.filter((x: any) => {
      if (x.role == 'batsman') {
        this.BAT.push(x);
      } else if (x.role == 'keeper') {
        this.WK.push(x);
      } else if (x.role == 'bowler') {
        this.BOWL.push(x);
      } else if (x.role == 'allrounder') {
        this.AR.push(x);
      }

    })

    // get user's team 
    this.api.getMyTeams(this.matchKey).subscribe((res: any) => {
      this.myTeams = res.data
      console.log(this.myTeams, ' response of my team');
    })
    this.team.filter((x: any) => {
      this.players.push(x.playerid)
      x.Active1 = false;
      x.Active2 = false;
    })
    console.log(this.players, 'team players ');

  }

  myteams() {
    this.api.getMyTeams(this.matchKey).subscribe((res: any) => {
      this.myTeams = res.data
      console.log(this.myTeams, ' response + my team');
      if (this.myTeams.length > 0) {
        this.joinTeamId = this.myTeams[this.myTeams.length - 1].jointeamid;
        document.getElementById("openModal")?.click();
        this.join();
      }
    })
  }

  join() {
    console.log(this.challengeId, "DETAILSSS");
    // this.challengeid = d.matchchallengeid;
    this.api.getUsableBalance(this.challengeId, 1).subscribe((res: any) => {
      console.log(res, 'getUsableBalance');
      this.usableBalanceArr = res.data
    })
  }
  // check user's balance and functioning according to the condition 
  joincontest() {
    if (Number(this.usableBalanceArr.entryfee) > Number(this.usableBalanceArr.usablebalance)) {
      this.toastr.error('add enough balance')
      this.router.navigate(['/dashboard/add-cash'])
    }
    else if (Number(this.usableBalanceArr.entryfee) <= Number(this.usableBalanceArr.usablebalance)) {
      let obj = {
        matchchallengeid: this.challengeId,
        jointeamid: this.joinTeamId,
      };
      this.api.joinContest(obj).subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success(res.message)
          // setTimeout(()=>{
          //   window.location.reload();
          // },1000)
          this.router.navigate(['/dashboard/upcoming-contest'], { queryParams: { matchkey: btoa(this.matchKey) } })
        }
        else {
          this.toastr.error(res.message)
        }
      }, err => {
        this.toastr.error(err.message)
      })

    }
  }
  // select captain condition 
  getCapSelected(player: any) {
    this.team.filter((x: any) => {
      if (x.playerid == player.playerid) {
        x.Active1 = !x.Active1;  // select deselect 
        x.Active2 = false;
      } else {
        x.Active1 = false;
      }
    })
    this.captain = [];
    this.captain.push(player.playerid)
    this.viceCaptain.filter((x: any) => {
      if (x == player.playerid) {
        this.viceCaptain.splice(this.viceCaptain.findIndex((y: any) => y == player.playerid), 1)
      }
    })
    console.log(this.captain, 'cap');
  }
  // select vice captain condition 
  getVCSelected(player2: any) {
    this.team.filter((x: any) => {
      if (x.playerid == player2.playerid) {
        x.Active2 = !x.Active2;  // select & deselect 
        x.Active1 = false;
      } else {
        x.Active2 = false;
      }
    })
    this.viceCaptain = []
    this.viceCaptain.push(player2.playerid)
    this.captain.filter((x: any) => {
      if (player2.playerid == x) {
        this.captain.splice(this.captain.findIndex((y: any) => y == player2.playerid), 1)
      }
    })
    console.log(this.viceCaptain, 'vcccc');
  }

  getMatchList() {
    this.api.getMatchlist().subscribe((res: any) => {
      this.upcoming = res.data.upcomingMatches
      console.log(this.upcoming, "RESPONSE");
      this.upcoming.filter((x: any) => {
        if (x.id == this.matchKey) {
          this.match = x;
          console.log(this.match, "MATCH");
          this.timeStart = Date.parse(x.time_start);
          console.log(this.timeStart, "START");
          this.finalDate = (this.timeStart - this.myDate) / 1000;
          console.log(this.finalDate, "FINAL");
        }
      })
    })
  }

  userInfo() {
    this.api.userFullDetails().subscribe((res: any) => {
      this.userDetails = res.data;
      console.log(this.userDetails, "HELLLOOo");

    })
  }
  // submiting final captain and vice captain       
  saveTeam() {
    this.team.filter((x: any) => {
      if (x.Active2) {
        x.Vicecaptain = true
      }
      if (x.Active1) {
        x.captain = true
      }
    })

    // for clone the team 
    if (this.teamnumber == undefined) {
      console.log('working for nrml condition ');

      let obj = {
        "matchkey": this.matchKey,
        'captain': this.captain[0],
        'vicecaptain': this.viceCaptain[0],
        'teamnumber': this.myTeams.length + 1,
        'players': this.players[0] + "," + this.players[1] + "," + this.players[2] + "," + this.players[3] + "," + this.players[4] + "," + this.players[5] + "," + this.players[6] + "," + this.players[7] + "," + this.players[8] + "," + this.players[9] + "," + this.players[10],
      }
      // submitting captain and vice captain in the api alo ng with the players id 
      this.api.createTeam(obj).subscribe((res: any) => {
        console.log(res, 'post api');
        if (res.success == true) {
          if (this.challengeId != 'undefined') {
            console.log(" NOT UNDEFINED");
            this.myteams()
          } else if (this.challengeId == 'undefined') {
            console.log("UNDEFINED");

            this.toastr.success(res.message);
            this.router.navigate(['/dashboard/upcoming-contest'], { queryParams: { matchkey: btoa(this.matchKey) } })
          }
        }
        else if (res.success == false) {
          this.toastr.error(res.message);
        }
      })
    }
    // for edit team 
    else if (this.teamnumber != undefined) {
      console.log('working for edit condition ');

      let obj = {
        "matchkey": this.matchKey,
        'captain': this.captain[0],
        'vicecaptain': this.viceCaptain[0],
        'teamnumber': this.teamnumber,
        'players': this.players[0] + "," + this.players[1] + "," + this.players[2] + "," + this.players[3] + "," + this.players[4] + "," + this.players[5] + "," + this.players[6] + "," + this.players[7] + "," + this.players[8] + "," + this.players[9] + "," + this.players[10],
      }
      this.api.createTeam(obj).subscribe((res: any) => {
        console.log(res, 'post api');
        if (res.success == true) {
          this.toastr.success(res.message);
          window.history.go(-2)
          // this.router.navigate(['/dashboard/upcoming-contest'],{queryParams:{matchkey:btoa(this.matchKey)}})
        }
        else if (res.success == false) {
          this.toastr.error(res.message);
        }
      })
    }
    localStorage.removeItem("team")


  }

  onClose() {
    window.history.go(-2);
  }
  // player info dialog box 
  playerInfo(id: any) {
    // console.log(id, 'player id ');
    this.dialog.open(PlayersInfoComponent, {
      data: { playerid: id, matchKey: this.matchKey },
      width: '40%',
      height: '80%',
      // panelClass:'full-screen-modal'

    })
    console.log(id, 'player id ');
    // this.router.navigate(['dashboard/players_Info'] , {queryParams :{  playerId:btoa(id ), matchKey:btoa(this.matchKey) }})
  }


  //  destroy matchkey so that user cannot visit this page by window history 
  ngOnDestroy(): void {
    // localStorage.removeItem("team")
    localStorage.removeItem("matchKey")
  }
}
