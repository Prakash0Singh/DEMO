import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  txn:any;
  constructor(private api : ApiService,private loader : AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    this.api.getTransaction().subscribe((res:any)=>{
      this.txn=res.data
      this.loader.close()
      console.log(this.txn,"TXN");
    })
  }

  onBack(){
    window.history.go(-1)
  }
}
