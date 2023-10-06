import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-apploader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent implements OnInit {
  progressColor: ThemePalette = 'accent';
  timerPercent: number = 0;
  progressLabel: number = 100;
  constructor(public dialogRef: MatDialogRef<AppLoaderComponent>) { }

  ngOnInit() {
  }

}
