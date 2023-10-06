import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { findIndex } from 'rxjs';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-choose-team',
  templateUrl: './choose-team.component.html',
  styleUrls: ['./choose-team.component.scss']
})
export class ChooseTeamComponent implements OnInit {

  matchKey: any; // Holds the match key
  myTeams: any = []; // Array to store user's teams
  newData: any = []; // Transformed data of user's teams
  userInfo: any = []; // User's information
  upcoming: any = []; // Upcoming matches
  match: any = []; // Selected match details
  contests: any = []; // Contests for the selected match
  ID: any; // ID of the selected contest
  challengeid: any; // ID of the selected challenge
  usableBalanceArr: any = []; // Usable balance information
  teamId: any; // ID of the selected team
  joinTeamId: any = []; // IDs of the selected teams to join
  joinID: any; // ID of the league to join
  teamID: any; // ID of the team
  btnBool = true; // Flag to control button state
  allSelected: boolean = false; // Flag to indicate if all teams are selected
  selectedContest: any = []; // Selected contest information
  leaderboard: any = []; // Leaderboard for the contest
  joinTeamid: any = []; // Joined team IDs
  myTeamsId: any = []; // IDs of the user's teams
  teamnumberleader: any = []; // Team numbers in the leaderboard
  skip = 0; // Number of items to skip
  limit = 10; // Number of items to display
  dataCheck = false; // Flag to indicate if data is available
  val: any; // Value for data manipulation

  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private loader: AppLoaderService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params, "DSDGF");
      this.matchKey = atob(params['matchkey']); // Decode and store the match key
      if (params['challengeid']) {
        this.challengeid = atob(params['challengeid']); // Decode and store the challenge ID
        this.leaderboardFun();
      } else if (params['teamId'] && params['joinleauge']) {
        this.joinID = params['joinleauge']; // Store the join league ID
        this.teamID = params['teamId']; // Store the team ID
        console.log(this.joinID, "JOIN ID");
        console.log(this.teamID, "TEAM ID");
      }
    })

    this.api.userFullDetails().subscribe((res: any) => {
      this.loader.open();
      this.userInfo = res.data; // Store the user's information
    })

    this.api.getMyTeams(this.matchKey).subscribe((res: any) => {
      this.myTeams = res.data; // Store the user's teams
      console.log(this.myTeams, "MY TEAMS");
      this.getContest();
      this.myTeams.filter((x: any) => {
        let team1Obj: any = {
          't1': [],
          't2': [],
          'wk': [],
          'bat': [],
          'ar': [],
          'bow': []
        };
        x.player.filter((y: any) => {
          if (y.team == x.team1Id) {
            team1Obj['t1'].push(y.team);
          }
          if (y.team == x.team2Id) {
            team1Obj['t2'].push(y.team);
          }
          if (y.role == 'keeper') {
            team1Obj['wk'].push(y);
          }
          if (y.role == 'batsman') {
            team1Obj['bat'].push(y);
          }
          if (y.role == 'allrounder') {
            team1Obj['ar'].push(y);
          }
          if (y.role == 'bowler') {
            team1Obj['bow'].push(y);
          }
        })
        this.newData.push(team1Obj); // Transform the data for easier access

      })
      console.log("this.newData", this.newData);
    })
  }
  //update the leaderboard
  leaderboardFun() {
    this.api.liveRankLeaderboard(this.matchKey, this.challengeid).subscribe((res: any) => {
      this.leaderboard = res.data; // Store the leaderboard data
      console.log(this.leaderboard, "LEader Board");
      this.leaderboard.filter((x: any) => {
        if (this.userInfo.id == x.userid) {
          this.joinTeamid.push(x.jointeamid);
          this.teamnumberleader.push(x.teamnumber);
        }
      })

      setTimeout(() => {
        this.myTeams.filter((x: any, i: any) => {
          if (this.joinTeamid[i] == x.jointeamid) {
            console.log("HELLOOO");
            x.alreadySelected = true;
            console.log(x, "isSelected", x.isSelected, 'the special one  knknjkn');
          }
        })
      }, 100);
      console.log(this.joinTeamid, "TEAM ID ARRAY");
    })
  }
  // retrieve the contest
  getContest() {
    this.api.getContest(this.matchKey).subscribe((res: any) => {
      this.contests = res.data; // Store the contests for the match
      console.log(this.contests, "CONTEST");
      this.ID = this.contests[0].contest[0].matchkey; // Store the ID of the selected contest
      this.getMatchlist();
      this.contests.filter((x: any) => {
        x.contest.filter((y: any) => {
          if (y.matchchallengeid == this.challengeid) {
            this.selectedContest = y; // Store the selected contest information
          }
        })
      })
      console.log(this.selectedContest, "SELECTED CONTEST");
    })
  }
  // gets the matchlist
  getMatchlist() {
    this.api.getMatchlist().subscribe((res: any) => {
      this.upcoming = res.data.upcomingMatches; // Store the upcoming matches
      this.loader.close();
      this.upcoming.filter((x: any) => {
        if (x.id == this.ID) {
          this.match = x; // Store the selected match details
          console.log(this.match, "MATCH");
        }
      })
    })
  }
  // select all the team
  selectAll() {
    this.joinTeamId = []; // Reset the join team IDs
    this.allSelected = !this.allSelected; // Toggle the allSelected flag
    console.log(this.allSelected, 'all sele');
    this.myTeams.filter((x: any) => {
      if (this.allSelected) {
        x.isSelected = true; // Select all teams
        this.joinTeamId.push(x.jointeamid); // Add team ID to the joinTeamId array
        this.joinTeamId.filter((y: any) => {
          if (x.alreadySelected) {
            this.joinTeamId.splice((x.jointeamid == y), this.joinTeamId.length);
            console.log(x.jointeamid, 'teamnumber', x.teamnumber, 'selected spliceed elements');
          }
        })
        this.btnBool = false; // Disable the button
      } else if (!this.allSelected) {
        x.isSelected = false; // Deselect all teams
        this.joinTeamId = []; // Reset the joinTeamId array
        this.btnBool = true; // Enable the button
      }
    })
    console.log(this.joinTeamId, 'selector');
  }

  // Helps to view the created team
  viewTeam(d: any) {
    console.log(d, 'view team ');
    this.myTeams.filter((x: any) => {
      if (x.jointeamid == d.jointeamid) {
        this.router.navigate(['/dashboard/team-view'], { queryParams: { matchkey: btoa(this.matchKey), teamId: btoa(d.jointeamid), teamNumber: btoa(d.teamnumber) } });
      }
    })
  }

  createTeam() {
    this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey) } });
  }
  // Store the usable balance information
  join() {
    this.api.getUsableBalance(this.challengeid, this.joinTeamId.length).subscribe((res: any) => {
      console.log(res, 'getUsableBalance');
      this.usableBalanceArr = res.data;
    })
  }

  switch() {
    let data1 = [
      {
        joinleaugeid: this.joinID,
        newjointeamid: this.joinTeamId
      }
    ]

    let data2 = {
      "matchkey": this.matchKey,
      "switchteam": JSON.stringify(data1)
    }

    this.api.switchTeams(data2).subscribe((res: any) => {
      console.log(res, "SWITCH");
      this.toastr.success(res.message);
      setTimeout(() => {
        window.history.go(-1);
      }, 1000);
    })
  }
  // Helps to select a single team
  radio(d: any) {
    if (this.teamID == null && this.selectedContest.multi_entry == 1) {
      this.myTeams.filter((x: any) => {
        if (x.jointeamid == d.jointeamid) {
          x.isSelected = !x.isSelected; // Toggle the team selection
          console.log(x, 'raaadddiioo');
          if (x.isSelected) {
            this.joinTeamId.push(d.jointeamid); // Add team ID to the joinTeamId array
            this.btnBool = false; // Disable the button
          } else if (!x.isSelected) {
            this.joinTeamId.splice(this.joinTeamId.findIndex((y: any) => y == x.jointeamid), 1); // Remove team ID from the joinTeamId array
          }
        }
      })
      console.log(this.joinTeamId, "CHECKBOX");
      if (this.joinTeamId.length === 0) {
        this.allSelected = false; // Deselect the "Select All" checkbox
        this.btnBool = true; // Enable the button
      } else if (this.joinTeamId.length == this.myTeams.length) {
        this.allSelected = true; // Select the "Select All" checkbox
      }
    } else {
      this.joinTeamId[0] = d.jointeamid;
      console.log(this.joinTeamId, "TRUE");
      this.btnBool = false; // Disable the button
    }
  }
  // check if the balance is available for joining the contest
  joincontest() {
    if (Number(this.usableBalanceArr.entryfee) > Number(this.usableBalanceArr.usablebalance)) {
      this.toastr.error('add enough balance');
      this.router.navigate(['/dashboard/add-cash']);
    } else if (Number(this.usableBalanceArr.entryfee) <= Number(this.usableBalanceArr.usablebalance)) {
      this.joinTeamId = this.joinTeamId.toString();
      let obj = {
        matchchallengeid: this.challengeid,
        jointeamid: this.joinTeamId
      };
      this.api.joinContest(obj).subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard/upcoming-contest'], { queryParams: { matchkey: btoa(this.matchKey) } });
        } else {
          this.toastr.error(res.message);
          this.router.navigate(['/dashboard/upcoming-contest'], { queryParams: { matchkey: btoa(this.matchKey) } });
        }
      }, err => {
        this.toastr.error(err.message);
      })

    }
  }
}
