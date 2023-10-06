import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/dashboard/services/api.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  data:any
  constructor(private api :ApiService) { }

  ngOnInit(): void {
    this.api.termsConditions().subscribe((res:any)=>{
      this.data=res.data.description
    })
  }

}
