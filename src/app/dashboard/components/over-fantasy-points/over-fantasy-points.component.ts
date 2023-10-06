import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-over-fantasy-points',
  templateUrl: './over-fantasy-points.component.html',
  styleUrls: ['./over-fantasy-points.component.scss']
})
export class OverFantasyPointsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBack(){
    window.history.go(-1)
  }
}
