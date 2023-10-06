import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from '../app-loader/app-loader.service';


@Component({
  selector: 'app-upcoming-contest',
  templateUrl: './upcoming-contest.component.html',
  styleUrls: ['./upcoming-contest.component.scss']
})
export class UpcomingContestComponent implements OnInit {

  matchKey: any;
  contests: any = [];
  upcoming: any = []
  match: any = [];
  myDate: any = new Date();
  timeStart: any;
  finalDate: any;
  contestType: any = [];
  prizePool: any = [];
  teams: any = [];
  entry: any = [];
  myTeams: any = [];
  newData: any = [];
  userInfo: any = [];
  myContest: any = [];
  usableBalanceArr: any = [];
  challengeid: any;
  joinTeamId: any;
  tabUp: any;
  priceCard: any = []
  totalWinners: any = []


  constructor(private route: ActivatedRoute, private api: ApiService, private datePipe: DatePipe, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private _snackBar: MatSnackBar, private loader: AppLoaderService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate = Date.parse(this.myDate)
    // console.log(this.myDate, 'DATE');
  }

  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

  // to uncheck all the filters applied by user 
  uncheckAll() {
    this.checkboxes.forEach((element: any) => {
      element.nativeElement.checked = false;
      this.filterForm.value.contest1 = ""
      this.filterForm.value.contest2 = ""
      this.filterForm.value.contest3 = ""
      this.filterForm.value.contest4 = ""
      this.filterForm.value.contest5 = ""

      this.filterForm.value.teams1 = ""
      this.filterForm.value.teams2 = ""
      this.filterForm.value.teams3 = ""
      this.filterForm.value.teams4 = ""
      this.filterForm.value.teams5 = ""

      this.filterForm.value.prize1 = ""
      this.filterForm.value.prize2 = ""
      this.filterForm.value.prize3 = ""
      this.filterForm.value.prize4 = ""
      this.filterForm.value.prize5 = ""

      this.filterForm.value.entry1 = ""
      this.filterForm.value.entry2 = ""
      this.filterForm.value.entry3 = ""
      this.filterForm.value.entry4 = ""

    });
  }

  ngOnInit(): void {
    this.loader.open()
    if (localStorage.getItem("tabUp")) {
      this.tabUp = localStorage.getItem("tabUp")
    } else {
      this.tabUp = 'tab1';
    }
    localStorage.removeItem("filter")

    this.route.queryParams.subscribe((params: any) => {
      if (params['matchkey']) {
        this.matchKey = atob(params['matchkey']);
      }


    })
    // this.getMatchList();
    this.api.getMatchlist().subscribe((res: any) => {
      console.log(res.data.upcomingMatches, "Thisis the rtesponsdfgdffdghff");

      this.upcoming = res.data.upcomingMatches
      console.log(this.upcoming, "RESPONSE");
      this.upcoming.filter((x: any) => {
        // console.log(x.id,"This is the x");
        // console.log(this.matchKey,"This is id")
        if (x.id == this.matchKey) {
          this.match = x;
          console.log(this.match, "MATCH");
          this.timeStart = Date.parse(x.time_start);
          // console.log(this.timeStart, "START");
          this.finalDate = (this.timeStart - this.myDate) / 1000;
          // console.log(this.finalDate, "FINAL");
        }
      })
    })
    this.getMyTeam();
    this.userDetails();
    this.joinedContest();
    this.joineedcontest()

    // Contest Type starts
    this.contestType = [
      {
        id: 'btn-contest', formControlName: 'contest1', name: 'Single Entry', value: 'Single Entry'
      },
      {
        id: 'btn-contest1', formControlName: 'contest2', name: 'Multi Entry', value: 'Multi Entry'
      },
      {
        id: 'btn-contest2', formControlName: 'contest3', name: 'Single Winner', value: 'Single Winner'
      },
      {
        id: 'btn-contest3', formControlName: 'contest4', name: 'Multi Winner', value: 'Multi Winner'
      },
      {
        id: 'btn-contest4', formControlName: 'contest5', name: 'Confirmed', value: 'Confirmed'
      }
    ]
    // Contest Type ends

    this.prizePool = [
      {
        id: 'btn-pool', formControlName: 'prize1', name: '₹ 1 - ₹ 10,000', value: '1-10000'
      },
      {
        id: 'btn-pool1', formControlName: 'prize2', name: '₹ 10,001 - ₹ 1 Lakhs', value: '10000-100000'
      },
      {
        id: 'btn-pool2', formControlName: 'prize3', name: '1 Lakhs - ₹ 10 Lakhs', value: '100000-1000000'
      },
      {
        id: 'btn-pool3', formControlName: 'prize4', name: '₹ 10 Laks - ₹ 25 Laks', value: '1000000-2500000'
      },
      {
        id: 'btn-pool4', formControlName: 'prize5', name: '₹ 25 Laks & above', value: '2500000'
      }
    ]

    this.teams = [
      {
        id: 'btn-team', formControlName: 'teams1', name: '2', value: '2'
      },
      {
        id: 'btn-team1', formControlName: 'teams2', name: '3 - 10', value: '3-10'
      },
      {
        id: 'btn-team2', formControlName: 'teams3', name: '11 - 100', value: '11-100'
      },
      {
        id: 'btn-team3', formControlName: 'teams4', name: '101 - 1,000', value: '101-1000'
      },
      {
        id: 'btn-team4', formControlName: 'teams5', name: '1,000 & above', value: '1000'
      }
    ]

    this.entry = [
      {
        id: 'btn-check', formControlName: 'entry1', name: '₹ 1 to ₹ 50', value: '1-50'
      },
      {
        id: 'btn-check1', formControlName: 'entry2', name: '₹ 51 to ₹ 100', value: '51-100'
      },
      {
        id: 'btn-check2', formControlName: 'entry3', name: '₹ 101 to ₹ 1,000', value: '101-1000'
      },
      {
        id: 'btn-check3', formControlName: 'entry4', name: '₹ 1,000 & above', value: '1000'
      }
    ]

    if (localStorage.getItem('team')) {
      localStorage.removeItem('team');
    }

  }



  // getMatchList() {

  // }
  // calculate total winners in a contest
  joineedcontest() {
    this.api.getContest(this.matchKey).subscribe((res: any) => {
      this.contests = res.data
      console.log(this.contests, "ALL CONTEST");

      this.loader.close()
      this.contests.filter((x: any) => {
        let winnersObj: any = {
          'winn': []
        }

        x.contest.filter((y: any) => {
          y.value = 0;
          y.value = y.joinedusers / y.maximum_user * 100

          let total = y.matchpricecards.reduce((previousValue: any, currentValue: any) => {
            return previousValue + Number(currentValue.winners)
          }, 0);
          winnersObj['winn'].push(total)
        })
        this.totalWinners.push(winnersObj)

      })
      console.log(this.totalWinners, "TOTALLLL");
      // this.ID = this.contests[0].contest[0].matchkey;
      // console.log(this.ID, "IDDDDDDD");     
      // this.join();
    })
  }
  // filter player based on thier role
  getMyTeam() {
    this.api.getMyTeams(this.matchKey).subscribe((res: any) => {
      this.myTeams = res.data
      console.log(this.myTeams, "My Teams");

      if (this.myTeams.length > 0) {
        this.joinTeamId = this.myTeams[this.myTeams.length - 1].jointeamid
      }
      console.log(this.myTeams, "MY TEAMS");
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
            team1Obj['t1'].push(y.team)
          }
          if (y.team == x.team2Id) {
            team1Obj['t2'].push(y.team)
          }
          if (y.role == 'keeper') {
            team1Obj['wk'].push(y)
          }
          if (y.role == 'batsman') {
            team1Obj['bat'].push(y)
          }
          if (y.role == 'allrounder') {
            team1Obj['ar'].push(y)
          }
          if (y.role == 'bowler') {
            team1Obj['bow'].push(y)
          }
        })
        this.newData.push(team1Obj);

      })

      console.log("this.newData", this.newData);
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, void 0, {
      duration: 2000,
      panelClass: 'center',
    });
  }
  userDetails() {
    this.api.userFullDetails().subscribe((res: any) => {
      this.userInfo = res.data
      console.log(this.userInfo, "USER DETAILS");
    })
  }

  joinedContest() {
    this.api.myJoinedContest(this.matchKey).subscribe((res: any) => {
      this.myContest = res.data
      console.log(this.myContest, "MY JOINED CONTEST");
      this.myContest.filter((x: any) => {
        x.value = 0;
        x.value = x.joinedusers / x.maximum_user * 100
      })
    })
  }

  join(d: any) {
    console.log(d, "DETAILSSS");
    this.challengeid = d.matchchallengeid;
    this.api.getUsableBalance(d.matchchallengeid, 1).subscribe((res: any) => {
      console.log(res, 'getUsableBalance');
      this.usableBalanceArr = res.data
    })
  }
  // if balance is availabe it will join a contest else will be navigated to add cash page
  joincontest() {
    if (Number(this.usableBalanceArr.entryfee) > Number(this.usableBalanceArr.usablebalance)) {
      this.toastr.error('add enough balance')
      this.router.navigate(['/dashboard/add-cash'])
    }
    else if (Number(this.usableBalanceArr.entryfee) <= Number(this.usableBalanceArr.usablebalance)) {
      let obj = {
        matchchallengeid: this.challengeid,
        jointeamid: this.joinTeamId
      };
      this.api.joinContest(obj).subscribe((res: any) => {
        if (res.success == true) {
          this.toastr.success(res.message)
          setTimeout(() => {
            window.location.reload();
          }, 1000)
          // this.router.navigate(['/dashboard/upcoming-contest'], { queryParams: { matchkey :  btoa(this.matchKey) } })
        }
        else {
          this.toastr.error(res.message)
        }
      }, err => {
        this.toastr.error(err.message)
      })

    }
  }
  //  filter form 
  filterForm = this.fb.group({
    entry1: [""],
    entry2: [""],
    entry3: [""],
    entry4: [""],
    teams1: [""],
    teams2: [""],
    teams3: [""],
    teams4: [""],
    teams5: [""],
    prize1: [""],
    prize2: [""],
    prize3: [""],
    prize4: [""],
    prize5: [""],
    contest1: [""],
    contest2: [""],
    contest3: [""],
    contest4: [""],
    contest5: [""],
  })


  createContest() {
    localStorage.setItem("tabUp", 'tab1')
    this.router.navigate(['/dashboard/create-contest'], { queryParams: { matchkey: btoa(this.matchKey) } })
  }

  onContest(id: any, t: any) {
    if (t === 'tab1') {
      localStorage.setItem("tabUp", 'tab1')
    } else if (t === 'tab2') {
      localStorage.setItem("tabUp", 'tab2')
    }
    this.router.navigate(['/dashboard/contest-details'], { queryParams: { matchchallengeid: btoa(id), matchkey: btoa(this.matchKey) } })
  }

  createTeam(t: any) {
    localStorage.removeItem("team")
    if (t === 'tab1') {
      localStorage.setItem("tabUp", 'tab1')
    } else if (t === 'tab3') {
      localStorage.setItem("tabUp", 'tab3')
    }
    this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey) } })
  }

  // apply filter 
  applyFilter() {
    localStorage.setItem("tabUp", 'tab1')
    // console.log(this.filterForm.value, "Thisdgfdgd");
    // this.api.filteredData=this.filterForm.value;
    localStorage.setItem("filter", JSON.stringify(this.filterForm.value))
    this.router.navigate(['/dashboard/filtered-contest'], { queryParams: { matchkey: btoa(this.matchKey) } })
  }

  onJoinContest(d: any) {
    localStorage.setItem("tabUp", 'tab1')
    console.log(d.matchchallengeid, "HELLOOO");
    // if user has no team left to join
    if (this.myTeams.length == 0 || d.joinedleauges == d.total_teams) {
      this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey), challengeid: btoa(d.matchchallengeid) } })
    }
    // open join contest modal to join the contest directly 
    else if (this.myTeams.length == 1 || d.joinedleauges == (d.total_teams - 1)) {
      document.getElementById("openModal")?.click();
      this.join(d);
    }

    // if user have more than one team then navigate to choose team 
    else if (this.myTeams.length > 1) {
      this.router.navigate(['/dashboard/choose-team'], { queryParams: { matchkey: btoa(this.matchKey), challengeid: btoa(d.matchchallengeid) } })
    }
  }


  onDescribeChange(val: any, event: any) {
    if (event.checked == true) {
      this.filterForm.get(val.formControlName)?.patchValue(val.value)
    }
    else if (event.checked != true) {
      this.filterForm.get(val.formControlName)?.patchValue("")
    }
  }

  changeTab(tab: any) {
    // console.log(tab,"CHANGE TABS");    
    localStorage.setItem("tabUp", tab)
  }

  // navigate to view team page 
  viewTeam(d: any) {
    localStorage.setItem("tabUp", 'tab3')
    this.router.navigate(['/dashboard/team-view'], { queryParams: { matchkey: btoa(this.matchKey), teamId: btoa(d.jointeamid), teamNumber: btoa(d.teamnumber) } })
  }

  //redirects for a new cloning the team on create team page
  clone(d: any) {
    localStorage.setItem("tabUp", 'tab3')
    this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey), teamId: btoa(d.jointeamid), teamNumber: btoa(d.teamnumber) } })
  }
  //redirects for editing the team on create team page
  edit(d: any) {
    localStorage.setItem("tabUp", 'tab3')
    this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey), teamId: btoa(d.jointeamid), teamNumber: btoa(d.teamnumber), edit: 'edit' } })
  }
}
