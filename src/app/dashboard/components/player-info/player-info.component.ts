import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  matchKey:any;
  playerId:any;
  playerInfo:any=[]
  constructor(public api : ApiService,private route : ActivatedRoute,private loader : AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    this.route.queryParams.subscribe((params:any)=>{
      this.matchKey = atob(params['matchkey']);
      this.playerId = atob(params['playerId'])
    })

    this.api.matchPlayerFantasy(this.playerId,this.matchKey).subscribe((res:any)=>{
      console.log(res,"HElloo");
      this.loader.close()
      this.playerInfo = res.data[0]
    })
  }

}
