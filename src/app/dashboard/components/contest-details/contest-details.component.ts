import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.scss']
})
export class ContestDetailsComponent implements OnInit {
  matchkey: any; // Match key
  challenegeID: any; // Challenge ID
  ID: any;
  upcoming: any = []; // Array to store upcoming matches
  match: any = []; // Match details
  myDate: any = new Date(); // Current date
  timeStart: any; // Start time of the match
  finalDate: any; // Time difference between current date and start time
  contestDetails: any = []; // Contest details
  price: any = []; // Price details
  value: any;
  leaderboard: any = []; // Leaderboard details
  userInfo: any = []; // User's information
  myTeams: any = []; // User's teams
  usableBalanceArr: any = []; // Usable balance details
  challengeid: any;
  joinTeamId: any;
  skip = 0;
  limit = 10;
  dataCheck = false;
  val: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private loader: AppLoaderService
  ) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate = Date.parse(this.myDate);
    console.log(this.myDate, 'DATE');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.challenegeID = atob(params['matchchallengeid']);
      this.matchkey = atob(params['matchkey']);
      console.log(this.challenegeID, 'CHALLENGE');
      console.log(this.matchkey, 'MATCHKEY');
    });

    this.api.getContestDetails(this.challenegeID, this.matchkey).subscribe((res: any) => {
      this.contestDetails = res.data;

      this.val = this.contestDetails.joinedusers;
      if (this.val > this.limit) {
        this.dataCheck = true;
      }
      this.loader.open();
      console.log(this.contestDetails, 'CONTEST');
      this.price = this.contestDetails.price_card;
      console.log(this.price, 'PRICE CARD');
      this.value = (this.contestDetails.joinedusers / this.contestDetails.maximum_user) * 100;
      this.getMatchList();
      this.liveLeaderboard();
      this.userDetails();
      this.teams();
    });
  }

  // Retrieve user's teams
  teams() {
    this.api.getMyTeams(this.matchkey).subscribe((res: any) => {
      this.myTeams = res.data;
      this.loader.close();
      if (this.myTeams.length > 0) {
        this.joinTeamId = this.myTeams[this.myTeams.length - 1].jointeamid;
      }
    });
  }

  // Retrieve match list
  getMatchList() {
    this.api.getMatchlist().subscribe((res: any) => {
      this.upcoming = res.data.upcomingMatches;
      console.log(this.upcoming, 'RESPONSE');
      this.upcoming.filter((x: any) => {
        if (x.id == this.matchkey) {
          this.match = x;
          console.log(this.match, 'MATCH');
          this.timeStart = Date.parse(x.time_start);
          console.log(this.timeStart, 'START');
          this.finalDate = (this.timeStart - this.myDate) / 1000;
          console.log(this.finalDate, 'FINAL');
        }
      });
    });
  }

  // Retrieve live leaderboard
  liveLeaderboard() {
    this.api.liveRankLeaderboard(this.matchkey, this.challenegeID, this.limit).subscribe((res: any) => {
      this.leaderboard = res.data;
      console.log(this.leaderboard, 'LEader Board');
    });
  }

  // Load more leaderboard data
  loadMore() {
    this.skip += 10;
    this.api.liveRankLeaderboard(this.matchkey, this.challenegeID, this.limit, this.skip).subscribe((res: any) => {
      this.leaderboard.push(...res.data);
    });
    if (this.leaderboard.length === this.val - 1) {
      this.dataCheck = false;
    }
  }

  // Retrieve user's details
  userDetails() {
    this.api.userFullDetails().subscribe((res: any) => {
      this.userInfo = res.data;
    });
  }

  // Join a contest
  onJoinContest() {
    if (this.myTeams.length == 0 || this.contestDetails.joinedleauges == this.contestDetails.total_teams) {
      this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchkey), challengeid: btoa(this.challenegeID) } });
    } else if (this.myTeams.length == 1 || this.contestDetails.joinedleauges == this.contestDetails.total_teams - 1) {
      document.getElementById('openModal')?.click();
      this.join();
    } else if (this.myTeams.length > 1) {
      this.router.navigate(['/dashboard/choose-team'], { queryParams: { matchkey: btoa(this.matchkey), challengeid: btoa(this.challenegeID) } });
    }
  }

  // Join a contest
  join() {
    this.api.getUsableBalance(this.challenegeID, 1).subscribe((res: any) => {
      console.log(res, 'getUsableBalance');
      this.usableBalanceArr = res.data;
    });
  }

  // Join a contest
  joincontest() {
    if (Number(this.usableBalanceArr.entryfee) > Number(this.usableBalanceArr.usablebalance)) {
      this.toastr.error('Add enough balance');
      this.router.navigate(['/dashboard/add-cash']);
    } else if (Number(this.usableBalanceArr.entryfee) <= Number(this.usableBalanceArr.usablebalance)) {
      let obj = {
        matchchallengeid: this.challenegeID,
        jointeamid: this.joinTeamId
      };
      this.api.joinContest(obj).subscribe(
        (res: any) => {
          if (res.success == true) {
            this.toastr.success(res.message);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.toastr.error(res.message);
          }
        },
        (err: any) => {
          this.toastr.error(err.message);
        }
      );
    }
  }

  // View user's team
  onMyTeam(d: any) {
    console.log(d, 'MY TEAM');
    if (d.team == this.userInfo.team) {
      this.router.navigate(['/dashboard/team-view'], {
        queryParams: { matchkey: btoa(this.matchkey), teamId: btoa(d.jointeamid), teamNumber: btoa(d.teamnumber) }
      });
    }
  }

  // Switch team
  onSwitch(d: any) {
    console.log(d, 'SWITCH');
    console.log('TEAm id', d.jointeamid);
    console.log('LEAUGE', d.joinleaugeid);
    this.router.navigate(['/dashboard/choose-team'], {
      queryParams: { teamId: d.jointeamid, joinleauge: d.joinleaugeid, matchkey: btoa(this.matchkey) }
    });
  }

  // Go back to the previous page
  onBack() {
    window.history.go(-1);
  }
}
