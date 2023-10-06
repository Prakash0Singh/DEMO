import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AppLoaderComponent } from './app-loader.component';

@Injectable()

export class AppLoaderService {
  dialogRef!: MatDialogRef<AppLoaderComponent>;
  constructor(private dialog: MatDialog) { }

  public open(): Observable<boolean> {
      this.dialogRef = this.dialog.open(AppLoaderComponent, {
        disableClose: true,
        position:{left:'70px'},
        backdropClass:'backdrop',
        minHeight:'60px',
        minWidth:'290px',
      });
      return this.dialogRef.afterClosed();
   
  }

  public close() {
    if (this.dialogRef) {
      // console.log('closed');
      // setTimeout(() => {
        this.dialogRef.close();
      // },500);
    }
  }

  public foreclose() {
    this.dialogRef.close();
  }
}
