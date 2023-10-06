import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-system',
  templateUrl: './point-system.component.html',
  styleUrls: ['./point-system.component.scss']
})
export class PointSystemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onBack(){
    window.history.go(-1)
  }
}
