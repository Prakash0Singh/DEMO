import { Component, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-completed-contest-details',
  templateUrl: './completed-contest-details.component.html',
  styleUrls: ['./completed-contest-details.component.scss']
})
export class CompletedContestDetailsComponent implements OnInit {
  matchKey: any;
  scorecardArr: any = []; // Array to store scorecard data
  completed: any = []; // Array to store completed matches
  joinedContest: any = []; // Array to store joined contests
  status: any = []; // Array to store contest status
  pricecard: any = []; // Array to store price card details
  myRank: any = []; // Array to store user's rank
  matchchallengeid: any; // ID of the match challenge
  userdetail: any = []; // User's details
  PlayingStats: any = []; // Array to store playing stats
  matchStatus: any; // Match status (live or completed)
  allContest: any = []; // Array to store all contests
  tabComp: any; // Current active tab
  skip = 0; // Skip count for pagination
  page = 10; // Page size for pagination
  dataCheck = false; // Flag to check if more data is available for pagination
  val: any; // Placeholder variable

  constructor(
    public api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    this.loader.open();
    if (localStorage.getItem("tabComp")) {
      this.tabComp = localStorage.getItem("tabComp");
    } else {
      this.tabComp = 'tab2';
    }
    this.route.queryParams.subscribe((params: any) => {
      this.matchKey = atob(params['matchkey']);
      this.matchchallengeid = atob(params['matchchallengeid']);
      this.matchStatus = params['live'];
    });
    this.api.userFullDetails().subscribe((res: any) => {
      this.userdetail = res.data;
    });
    this.livescore();
    this.myjoinedcontest();
    this.matches();
    this.liveRankleaderboard();
    this.PlayingStatus();
  }
  // pagination for loading live ranking of leaderboard
  loadMore() {
    this.skip += 10;
    this.api.liveRanksLeaderboard2(this.matchKey, this.matchchallengeid, this.page, this.skip).subscribe((res: any) => {
      this.myRank.push(...res.data.jointeams);
    });
    if (this.myRank.length === this.val - 1) {
      this.dataCheck = false;
    }
  }

  // Retrieve joined contests for the user
  myjoinedcontest() {
    this.api.myJoinedContest(this.matchKey).subscribe((res: any) => {
      this.allContest = res.data;
      this.allContest.filter((x: any) => {
        if (x.matchchallengeid == this.matchchallengeid) {
          this.joinedContest = x;
          this.pricecard = x.price_card;
        }
      });
      this.status = this.joinedContest.matchFinalstatus;
      this.val = this.joinedContest.joinedusers;

      if (this.val > this.page) {
        this.dataCheck = true;
      }

      if (this.status == "pending") {
        this.status = "In Progress";
      } else if (this.status == "IsReviewed") {
        this.status = "Under Review";
      }
      this.loader.close();
    });
  }

  // Retrieve completed matches
  matches() {
    if (this.matchStatus == 'live') {
      this.api.liveMatches().subscribe((res: any) => {
        res.data.filter((x: any) => {
          if (x.matchkey == this.matchKey) {
            this.completed = x;
          }
        });
      });
    } else {
      this.api.allCompletedMatches().subscribe((res: any) => {
        res.data.filter((x: any) => {
          if (x.matchkey == this.matchKey) {
            this.completed = x;
          }
        });
      });
    }
  }

  // Change active tab
  changeTab(tab: any) {
    localStorage.setItem("tabComp", tab);
  }

  // Retrieve live scorecard data
  livescore() {
    this.api.getlivescores(this.matchKey).subscribe((res: any) => {
      this.scorecardArr.push(res.data);
    });
  }

  // Retrieve leaderboard for live ranks
  liveRankleaderboard() {
    this.api.liveRanksLeaderboard2(this.matchKey, this.matchchallengeid, this.page, this.skip).subscribe((res: any) => {
      this.myRank = res.data.jointeams;
    });
  }

  // View team details
  viewTeam(d: any) {
    localStorage.setItem("tabComp", 'tab2');
    this.router.navigate(['/dashboard/team-view'], { queryParams: { matchkey: btoa(this.matchKey), teamId: btoa(d.jointeamid), teamNumber: btoa(d.teamnumber), mymatches: "team" } });
  }

  // Retrieve playing status
  PlayingStatus() {
    this.api.PlayingStatus(this.matchKey).subscribe((res: any) => {
      this.PlayingStats = res.data;
    });
  }

  // View player information
  onplayerInfo(x: any) {
    localStorage.setItem("tabComp", 'tab3');
    this.router.navigate(['/dashboard/player-info'], { queryParams: { matchkey: btoa(this.matchKey), playerId: btoa(x) } });
  }

}
