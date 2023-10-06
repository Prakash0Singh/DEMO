import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from '../app-loader/app-loader.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  userDetails: any = [];
  refer: any = [];

  constructor(private api: ApiService, private _snackBar: MatSnackBar, private loader: AppLoaderService) { }

  ngOnInit(): void {
    this.loader.open()
    this.api.userFullDetails().subscribe((res: any) => {
      this.userDetails = res.data
      console.log(this.userDetails, "USER");

      this.referlist()
    })
  }
  // refercode of user 
  referlist() {
    this.api.referList().subscribe((res: any) => {
      console.log(res, "REFER");
      this.refer = res.data
      this.loader.close()
    })
  }
  // open snackbar duration 2 seconds
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, void 0, {
      duration: 2000,
      panelClass: 'center',
    });
  }

  // go back 
  onBack() {
    window.history.go(-1)
  }

}
