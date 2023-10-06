import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'commentcodeFantasy';


  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (!(event instanceof NavigationEnd)) {
  
        return;
      }
     window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  
}

