import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private api:ApiService, private router:Router) { 
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.router.navigate(['/dashboard/home'])
  }

}
