import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AppLoaderService } from '../app-loader/app-loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  walletDetails:any=[]
  userDetails:any=[]
  constructor(private api : ApiService,private loader : AppLoaderService , private router:Router) { }

  ngOnInit(): void {
    this.loader.open()
    this.api.myWalletDetails().subscribe((res:any)=>{
      this.walletDetails = res.data
      this.loader.close()
      console.log(this.walletDetails,"RESponse");
    })
    this.api.userFullDetails().subscribe((res:any)=>{
      this.userDetails = res.data;
      console.log(this.userDetails);
    })
  }
  // allow to withdraw only if user is verified 
  withdrawbtn(){
    if(this.userDetails.BankVerified==0 || this.userDetails.PanVerified==0  ||this.userDetails.BankVerified==-1 || this.userDetails.PanVerified==-1 ||this.userDetails.BankVerified==2 || this.userDetails.PanVerified==2){
      this.router.navigate(['/dashboard/kyc'])
    }
   else if(this.userDetails.BankVerified==1 && this.userDetails.PanVerified==1 ){
      this.router.navigate(['/dashboard/withdraw'])
    }
  }
  onBack(){
    window.history.go(-1);
  }
}
