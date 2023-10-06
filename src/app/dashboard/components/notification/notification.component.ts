import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notification:any=[];
  myDate:any = new Date().toLocaleString().split("T")[0];
  today:any=[];
  older:any=[]

  constructor(private api : ApiService,private datePipe: DatePipe,private loader : AppLoaderService) {
    this.myDate =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.myDate,"TODAY");
    
   }

  ngOnInit(): void {
    this.loader.open()
   this.api.getNotification().subscribe((res:any)=>{
    this.notification = res.data
    this.loader.close()
    console.log(this.notification,"RES");
    this.notification.filter((x:any)=>{
      //  to get only date from standard iso date format 
      if(this.myDate==x.updatedAt.split("T")[0]){
        this.today.push(x)
      }
      else if(this.myDate>x.updatedAt.split("T")[0]){
        this.older.push(x)
      }
    })
    console.log(this.today,"TODAY`S NOTI");
    console.log(this.older,"OLDER NOTI");    
   })
  }


  onBack(){
    window.history.go(-1)
  }
}
