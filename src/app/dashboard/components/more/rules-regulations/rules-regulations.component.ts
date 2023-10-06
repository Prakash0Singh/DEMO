import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-rules-regulations',
  templateUrl: './rules-regulations.component.html',
  styleUrls: ['./rules-regulations.component.scss']
})
export class RulesRegulationsComponent implements OnInit {
  data:any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.rulesRegulation().subscribe((res:any)=>{
      this.data=res.data.description
    })
  }

}
