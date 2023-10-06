  import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppLoaderService } from '../app-loader/app-loader.service';

export interface DialogData {
  playerid: any;
  matchKey: any;
}

@Component({
  selector: 'app-players-info',
  templateUrl: './players-info.component.html',
  styleUrls: ['./players-info.component.scss']
})
export class PlayersInfoComponent implements OnInit {

  constructor(public api: ApiService, private route: ActivatedRoute, public dialogRef: MatDialogRef<PlayersInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private loader: AppLoaderService) { }
  matchKey: any;
  playerId: any;
  playerInfo: any = []
  playerMatchesInfo: any = []

  ngOnInit(): void {
    this.loader.open()
    // this.route.queryParams.subscribe((params:any)=>{
    //   this.matchKey = atob(params['matchKey']);
    //   this.playerId = atob(params['playerId'])
    // })
    this.getPlayerInfo()
  }
  // Get a player details
  getPlayerInfo() {
    this.api.getPlayerInfo(this.data.playerid, this.data.matchKey).subscribe((res: any) => {
      console.log(res, "This is ther frterspiner");
      if (res.success == true) {
        this.playerInfo = res.data
        this.playerMatchesInfo = res.data.matches
        this.loader.close()
      }

    })
  }

}
