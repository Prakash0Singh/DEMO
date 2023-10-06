import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  version:any=[];
  constructor(public api : ApiService) { }

  ngOnInit(): void {
    this.api.getVersion().subscribe((res:any)=>{
      this.version = res.data.version
      console.log(this.version,"SDFGHJ");
    })
  }

}
