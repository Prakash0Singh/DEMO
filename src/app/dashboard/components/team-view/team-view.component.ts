import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersInfoComponent } from '../players-info/players-info.component';
import { MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from '../app-loader/app-loader.service';


@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  matchKey: any;
  teamId: any;
  teamNumber: any;
  myTeamView: any = [];
  keeper: any = [];
  bats: any = [];
  bowler: any = [];
  allRound: any = [];
  userInfo: any = [];
  myMatch: any


  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private loader: AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    this.route.queryParams.subscribe((params: any) => {
      this.matchKey = atob(params['matchkey']);
      this.teamId = atob(params['teamId']);
      this.teamNumber = atob(params['teamNumber']);
      this.myMatch = params['mymatches']

      console.log();

    })

    this.api.viewTeam(this.matchKey, this.teamId, this.teamNumber).subscribe((res: any) => {
      this.myTeamView = res.data;
      console.log(this.myTeamView, "VIEW TEAM");
      this.myTeamView.filter((x: any) => {
        if (x.role === 'keeper') {
          this.keeper.push(x);
        }
        else if (x.role === 'batsman') {
          this.bats.push(x);
        }
        else if (x.role === 'bowler') {
          this.bowler.push(x);
        }
        else if (x.role === 'allrounder') {
          this.allRound.push(x);
        }
      })
      this.userDetails();
    })
  }

  userDetails() {
    this.api.userFullDetails().subscribe((res: any) => {
      this.userInfo = res.data;
      this.loader.close()
    })
  }

  onEdit() {
    this.router.navigate(['/dashboard/create-team'], { queryParams: { matchkey: btoa(this.matchKey), teamId: btoa(this.teamId), teamNumber: btoa(this.teamNumber), edit: 'edit' } })
  }


  // open dialoge box for player's info 
  onplayerInfo(id: any) {
    if (this.myMatch) {
      this.myTeamView.filter((x: any) => {
        if (x.id == id) {
          console.log(id, "IDDD");
          console.log(this.matchKey, "GHJKJG");
          this.router.navigate(['/dashboard/player-info'], { queryParams: { matchkey: btoa(this.matchKey), playerId: btoa(x.id) } })
        }
      })
    } else {
      console.log(id, 'player id ');
      this.dialog.open(PlayersInfoComponent, {
        data: { playerid: id, matchKey: this.matchKey },
        width: '40%',
        height: '60%'
        // panelClass:'full-screen-modal'

      })
      // this.router.navigate(['dashboard/players_Info'] , {queryParams :{  playerId:btoa(id ), matchKey:btoa(this.matchKey) }})   }
    }
  }


}
