import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-filtered-contest',
  templateUrl: './filtered-contest.component.html',
  styleUrls: ['./filtered-contest.component.scss']
})
export class FilteredContestComponent implements OnInit {
  filterDetails: any = [];
  matchKey: any;
  challengeid: any
  contests: any = [];
  allContest: any = [];
  data: any = [];
  filteredData1: any = [];
  filteredData2: any = [];
  filteredData3: any = [];
  filteredData4: any = [];
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
  filter1Bool = false;
  filter2Bool = false;
  filter3Bool = false;
  filter4Bool = false;
  joinTeamId: any;
  usableBalanceArr: any = [];
  totalWinners: any = []


  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;

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

  constructor(public api: ApiService, private route: ActivatedRoute, private datePipe: DatePipe, private fb: FormBuilder, private router: Router, private toastr: ToastrService, private loader: AppLoaderService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate = Date.parse(this.myDate)
    console.log(this.myDate, 'DATE');
  }
  // @HostListener('window:load', ['$event'])
  // beforeUnloadHander(event:any) {
  //   window.history.go(-1);
  // }
  ngOnInit(): void {
    this.filterDetails = JSON.parse(localStorage.getItem("filter") || '');
    console.log(this.filterDetails, "THIS.FILTER");

    this.route.queryParams.subscribe((params: any) => {
      this.matchKey = atob(params['matchkey'])
    })


    this.api.getContest(this.matchKey).subscribe((res: any) => {
      this.loader.open()
      for (const key in this.filterDetails) {
        if (this.filterDetails[key] != null) {
          this.data.push(this.filterDetails[key])
        }
      }
      console.log(this.data, "DATAAAA");

      // console.log("this.filterDetail",this.filterDetails);
      this.contests = res.data
      console.log(this.contests, "HELOOO");
      this.contests.filter((x: any) => {
        x.contest.filter((y: any) => {
          this.allContest.push(y)
          y.value = 0;
          y.value = y.joinedusers / y.maximum_user * 100
        })
      })
      console.log("ALL CONTEST", this.allContest);
      this.getMatchList()
      this.getMyTeam()
      // if(this.filterDetails.contest1=="" && this.filterDetails.contest2=="" && this.filterDetails.contest3=="" && this.filterDetails.contest4=="" && this.filterDetails.contest5=="" &&
      // this.filterDetails.teams1=="" && this.filterDetails.teams2=="" && this.filterDetails.teams3=="" && this.filterDetails.teams4=="" && this.filterDetails.teams5=="" &&
      // this.filterDetails.prize1=="" && this.filterDetails.prize2=="" && this.filterDetails.prize3=="" && this.filterDetails.prize4=="" && this.filterDetails.prize5=="" &&
      // this.filterDetails.entry1=="" && this.filterDetails.entry2=="" && this.filterDetails.entry3=="" && this.filterDetails.entry4==""){
      //   this.filteredData4=[]
      //   console.log("Emptyyyyndfghgfdfj");
      //   // return
      // }
      this.filter1();
      this.filter2();
      this.filter3();
      this.filter4();
    })

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

  }

  getMyTeam() {
    this.api.getMyTeams(this.matchKey).subscribe((res: any) => {
      this.myTeams = res.data
      if (this.myTeams.length > 0) {
        this.joinTeamId = this.myTeams[0].jointeamid
      }
      console.log(this.myTeams, "MY TEAMS");
    })
  }

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

  onDescribeChange(val: any, event: any) {
    if (event.checked == true) {
      this.filterForm.get(val.formControlName)?.patchValue(val.value)
    }
    else if (event.checked != true) {
      this.filterForm.get(val.formControlName)?.patchValue("")
    }
  }

  applyFilter() {
    this.filteredData4 = []
    this.filterDetails = []
    // console.log(this.filterForm.value, "Thisdgfdgd");
    this.filterDetails = this.filterForm.value;
    localStorage.setItem("filter", JSON.stringify(this.filterForm.value))
    console.log(this.filterDetails, "DFGHJKL");
    if (this.filterDetails.contest1 == "" && this.filterDetails.contest2 == "" && this.filterDetails.contest3 == "" && this.filterDetails.contest4 == "" && this.filterDetails.contest5 == "" &&
      this.filterDetails.teams1 == "" && this.filterDetails.teams2 == "" && this.filterDetails.teams3 == "" && this.filterDetails.teams4 == "" && this.filterDetails.teams5 == "" &&
      this.filterDetails.prize1 == "" && this.filterDetails.prize2 == "" && this.filterDetails.prize3 == "" && this.filterDetails.prize4 == "" && this.filterDetails.prize5 == "" &&
      this.filterDetails.entry1 == "" && this.filterDetails.entry2 == "" && this.filterDetails.entry3 == "" && this.filterDetails.entry4 == "") {
      this.filteredData4 = []
      localStorage.setItem("filter", JSON.stringify(this.filterForm.value))
      console.log("Emptyyyy45346457467");
    }
    this.filter1();
    this.filter2();
    this.filter3();
    this.filter4();
  }

  getMatchList() {
    this.api.getMatchlist().subscribe((res: any) => {
      this.upcoming = res.data.upcomingMatches
      this.loader.close()
      // console.log(this.upcoming,"RESPONSE");
      this.upcoming.filter((x: any) => {
        if (x.id == this.matchKey) {
          this.match = x;
          // console.log(this.match,"MATCH");    
          this.timeStart = Date.parse(x.time_start);
          // console.log(this.timeStart,"START");
          this.finalDate = (this.timeStart - this.myDate) / 1000;
          // console.log(this.finalDate,"FINAL");
        }
      })
    })
  }


  filter1() {
    this.filteredData1 = []
    this.allContest.filter((x: any) => {
      if (this.filterDetails.entry1 == "1-50") {
        if (x.entryfee > 0 && x.entryfee < 51) {
          this.filteredData1.push(x)
        }
      }

      if (this.filterDetails.entry2 == "51-100") {
        if (x.entryfee > 50 && x.entryfee < 101) {
          this.filteredData1.push(x)
        }
      }

      if (this.filterDetails.entry3 == "101-1000") {
        if (x.entryfee > 100 && x.entryfee < 1001) {
          this.filteredData1.push(x)
        }
      }

      if (this.filterDetails.entry4 == "1000") {
        if (x.entryfee >= 1000) {
          this.filteredData1.push(x)
        }
      }

      if (this.filterDetails.entry1 == '' && this.filterDetails.entry2 == '' && this.filterDetails.entry3 == '' && this.filterDetails.entry4 == '') {
        // this.filter1Bool=true
        this.filteredData1.push(x)
        console.log('working1');

      }
    })

    console.log(this.filteredData1, "filterdata1");

  }

  filter2() {
    this.filteredData2 = []
    this.filteredData1.filter((x: any) => {
      if (this.filterDetails.teams1 == "2") {
        if (x.maximum_user == 2) {
          this.filteredData2.push(x)
        }
      }

      if (this.filterDetails.teams2 == "3-10") {
        if (x.maximum_user > 2 && x.maximum_user < 11) {
          this.filteredData2.push(x)
        }
      }

      if (this.filterDetails.teams3 == "11-1000") {
        if (x.maximum_user > 10 && x.maximum_user < 101) {
          this.filteredData2.push(x)
        }
      }

      if (this.filterDetails.teams4 == "101-1000") {
        if (x.maximum_user > 100 && x.maximum_user < 1001) {
          this.filteredData2.push(x)
        }
      }

      if (this.filterDetails.teams5 == "1000") {
        if (x.maximum_user >= 1000) {
          this.filteredData2.push(x)
        }
      }
      if (this.filterDetails.teams1 == '' && this.filterDetails.teams2 == '' && this.filterDetails.teams3 == '' && this.filterDetails.teams4 == '' && this.filterDetails.teams5 == '') {
        // this.filter2Bool=true
        this.filteredData2.push(x)
        console.log('working2');

      }

    })
    console.log(this.filteredData2, "filterdata2");

  }

  filter3() {
    this.filteredData3 = []
    this.filteredData2.filter((x: any) => {
      if (this.filterDetails.prize1 == "1-10000") {
        if (x.win_amount >= 1 && x.win_amount <= 10000) {
          this.filteredData3.push(x)
        }
      }

      if (this.filterDetails.prize2 == "10001-100000") {
        if (x.win_amount >= 10001 && x.win_amount <= 100000) {
          this.filteredData3.push(x)
        }
      }

      if (this.filterDetails.prize3 == "100000-1000000") {
        if (x.win_amount >= 100000 && x.win_amount <= 1000000) {
          this.filteredData3.push(x)
        }
      }

      if (this.filterDetails.prize4 == "1000000-2500000") {
        if (x.win_amount >= 1000000 && x.win_amount <= 2500000) {
          this.filteredData3.push(x)
        }
      }

      if (this.filterDetails.prize5 == "2500000") {
        if (x.win_amount >= 2500000) {
          this.filteredData3.push(x)
        }
      }

      if (this.filterDetails.prize1 == '' && this.filterDetails.prize2 == '' && this.filterDetails.prize3 == '' && this.filterDetails.prize4 == '' && this.filterDetails.prize5 == '') {
        // this.filter3Bool=true
        this.filteredData3.push(x)
        console.log('working3');

      }
    })
    console.log(this.filteredData3, "filterdata3");


  }

  filter4() {
    this.filteredData4 = []
    this.filteredData3.filter((x: any) => {
      if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 0) {
          this.filteredData4.push(x)
        }
      }

      if (this.filterDetails.contest2 == "Multi Entry" && this.filterDetails.contest1 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 1) {
          this.filteredData4.push(x)
        }
      }
      if (this.filterDetails.contest3 == "Single Winner" && this.filterDetails.contest2 == '' && this.filterDetails.contest1 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        if (x.totalwinners == 1) {
          this.filteredData4.push(x)
        }
      }

      if (this.filterDetails.contest4 == "Multi Winner" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest1 == '' && this.filterDetails.contest5 == '') {
        if (x.totalwinners > 1) {
          this.filteredData4.push(x)
        }
      }

      if (this.filterDetails.contest5 == "Confirmed" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest1 == '') {
        if (x.confirmed_challenge == 1) {
          this.filteredData4.push(x)
        }
      }

      if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == 'Single Winner' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 0 && x.totalwinners == 1) {
          this.filteredData4.push(x)
        }
      }
      if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == 'Multi Winner' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 0 && x.totalwinners > 1) {
          this.filteredData4.push(x)
        }
      }
      if (this.filterDetails.contest1 == "" && this.filterDetails.contest2 == 'Multi Entry' && this.filterDetails.contest3 == 'Single Winner' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 1 && x.totalwinners == 1) {
          this.filteredData4.push(x)
        }
      }
      if (this.filterDetails.contest1 == "" && this.filterDetails.contest2 == 'Multi Entry' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == 'Multi Winner' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 1 && x.totalwinners > 1) {
          this.filteredData4.push(x)
        }
      }
      if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest2 == 'Multi Entry' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        if (x.multi_entry == 1 && x.multi_entry == 0) {
          this.filteredData4.push(x)
        }
      }
      if (this.filterDetails.contest1 == "" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == 'Single Winner' && this.filterDetails.contest4 == 'Multi Winner' && this.filterDetails.contest5 == '') {
        if (x.totalwinners == 1 && x.totalwinners > 1) {
          this.filteredData4.push(x)
        }
      }
      if ((this.filterDetails.contest1 == "Single Entry" || this.filterDetails.contest2 == 'Multi Entry') && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == 'Confirmed') {
        if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest5 == "Confirmed") {
          if (x.multi_entry == 0 && x.confirmed_challenge == 1)
            this.filteredData4.push(x)
        }
        else if (this.filterDetails.contest2 == "Multi Entry" && this.filterDetails.contest5 == "Confirmed") {
          if (x.multi_entry == 1 && x.confirmed_challenge == 1)
            this.filteredData4.push(x)
        }
      }
      if ((this.filterDetails.contest3 == "Single Winner" || this.filterDetails.contest4 == 'Multi Winner') && this.filterDetails.contest1 == '' && this.filterDetails.contest2 == '' && this.filterDetails.contest5 == 'Confirmed') {
        if (this.filterDetails.contest3 == "Single Winner" && this.filterDetails.contest5 == "Confirmed") {
          if (x.totalwinners == 1 && x.confirmed_challenge == 1)
            this.filteredData4.push(x)
        }
        else if (this.filterDetails.contest4 == "Multi Winner" && this.filterDetails.contest5 == "Confirmed") {
          if (x.totalwinners > 1 && x.confirmed_challenge == 1)
            this.filteredData4.push(x)
        }
      }
      if ((this.filterDetails.contest3 == "Single Winner" || this.filterDetails.contest4 == 'Multi Winner') && (this.filterDetails.contest1 == "Single Entry" || this.filterDetails.contest2 == 'Multi Entry') && this.filterDetails.contest5 == 'Confirmed') {
        if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == 'Single Winner' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == 'Confirmed') {
          if (x.multi_entry == 0 && x.totalwinners == 1 && x.confirmed_challenge == 1) {
            this.filteredData4.push(x)
          }
        }
        else if (this.filterDetails.contest1 == "Single Entry" && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == 'Multi Winner' && this.filterDetails.contest5 == 'Confirmed') {
          if (x.multi_entry == 0 && x.totalwinners > 1 && x.confirmed_challenge == 1) {
            this.filteredData4.push(x)
          }
        }
        else if (this.filterDetails.contest1 == "" && this.filterDetails.contest2 == 'Multi Entry' && this.filterDetails.contest3 == 'Single Winner' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == 'Confirmed') {
          if (x.multi_entry == 1 && x.totalwinners == 1 && x.confirmed_challenge == 1) {
            this.filteredData4.push(x)
          }
        }
        else if (this.filterDetails.contest1 == "" && this.filterDetails.contest2 == 'Multi Entry' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == 'Multi Winner' && this.filterDetails.contest5 == 'Confirmed') {
          if (x.multi_entry == 1 && x.totalwinners > 1 && x.confirmed_challenge == 1) {
            this.filteredData4.push(x)
          }
        }

      }
      if (this.filterDetails.contest1 == '' && this.filterDetails.contest2 == '' && this.filterDetails.contest3 == '' && this.filterDetails.contest4 == '' && this.filterDetails.contest5 == '') {
        // this.filter4Bool=true
        this.filteredData4.push(x)
        this.loader.close()
        console.log('working4');

      }


    })
    console.log(this.filteredData4, "filterdata4");
    this.filteredData4.filter((x: any) => {
      let total = x.matchpricecards.reduce((previousValue: any, currentValue: any) => {
        return previousValue + Number(currentValue.winners)
      }, 0);
      this.totalWinners.push(total)
    })
    console.log(this.totalWinners, "TOTALLLL");

  }
  // show avaible team while joining a contest
  onJoinContest(d: any) {
    console.log(d.matchchallengeid, "HELLOOO");
    if (this.myTeams.length == 0) {
      this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey), challengeid: btoa(d.matchchallengeid) } })
    }
    else if (this.myTeams.length == 1) {
      document.getElementById("openModal")?.click();
      this.join(d);
    }
    else if (this.myTeams.length > 1) {
      this.router.navigate(['/dashboard/choose-team'], { queryParams: { matchkey: btoa(this.matchKey), challengeid: btoa(d.matchchallengeid) } })
    }
  }

  join(d: any) {
    console.log(d, "DETAILSSS");
    this.challengeid = d.matchchallengeid;
    this.api.getUsableBalance(d.matchchallengeid, 1).subscribe((res: any) => {
      console.log(res, 'getUsableBalance');
      this.usableBalanceArr = res.data
    })
  }
  // checks if balance is available to join a contest
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

  onContest(id: any) {
    this.router.navigate(['/dashboard/contest-details'], { queryParams: { matchchallengeid: btoa(id), matchkey: btoa(this.matchKey) } })
  }

}


