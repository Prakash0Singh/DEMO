import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-joined-contest-details',
  templateUrl: './joined-contest-details.component.html',
  styleUrls: ['./joined-contest-details.component.scss'],
})
export class JoinedContestDetailsComponent implements OnInit {
  matchKey: any;
  joinedcontests: any[] = [];
  upcoming: any;
  match: any = [];
  timeStart: any;
  finalDate: any;
  skip = 0;
  limit = 10;
  dataCheck = false;
  val: any;
  myDate: any = new Date();

  constructor(
    public api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private loader: AppLoaderService
  ) {
    // subscribing params 
    this.route.queryParams.subscribe((params: any) => {
      this.matchKey = atob(params['matchkey']);
      console.log(this.matchKey, 'MATCH KEY');
    });
  }

  ngOnInit(): void {
    this.loader.open()
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss'); // traforming date format
    this.myDate = Date.parse(this.myDate);
    this.joined();
  }


  matchList() {
    // storing joined matches list 
    this.api.getMatchlist().subscribe((res: any) => {
      this.val = res.data.joinedMatches.length
      if (this.val > this.limit) {
        this.dataCheck = true
      }
      res.data.joinedMatches.filter((x: any) => {
        // matching matchkey key to get exact match 
        if (x.matchkey == this.matchKey) {
          this.match = x;
          console.log(this.match, 'MATCH');
          this.timeStart = Date.parse(x.start_date);
          // console.log(this.timeStart, "START");
          this.finalDate = (this.timeStart - this.myDate) / 1000;
          // console.log(this.finalDate, "FINAL");
        }
      });
    });

  }

  joined() {
    this.api.myJoinedContest(this.matchKey, this.limit).subscribe((res: any) => {
      this.joinedcontests = res.data;
      this.loader.close()
      this.matchList();
      this.joinedcontests.filter((y: any) => {
        y.value = 0;
        y.value = y.joinedusers / y.maximum_user * 100    // progress bar percentage value 
      })
      console.log(this.joinedcontests, 'joined contests list ');
    });
  }


  // load more functionality 
  loadMore() {
    this.skip += 10
    this.api.myJoinedContest(this.matchKey, this.limit, this.skip).subscribe((res: any) => {
      this.joinedcontests.push(...res.data)
    })
    if (this.joinedcontests.length === this.val - 1) {
      this.dataCheck = false
    }
  }

  // open snackbar for 2 sec 
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, void 0, {
      duration: 2000,
      panelClass: 'center',
    });
  }

  onContest(id: any) {
    this.router.navigate(['/dashboard/contest-details'], { queryParams: { matchchallengeid: btoa(id), matchkey: btoa(this.matchKey) } })
  }
}
