import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/dashboard/services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  userDetail: any=[];
  constructor(private router : Router,private api : ApiService, private auth : AuthService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem("token");
      
      // const loginmobile = localStorage.getItem("loginmobile");
      // console.log(loginmobile,"loginmobile guard");
      // if(loginmobile){
      //   return true
      // }else{
      //   return false
      // }
      if(token){
        this.api.userFullDetails().subscribe({
          next:(res:any)=> {
            this.userDetail = res.data;
          if(this.userDetail.team=='' && this.userDetail.state=='' && this.userDetail.dob==''){
            this.router.navigateByUrl('dashboard/home/create-profile')
            return;
          }
          },
        })
        return true
      }
      else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false
      }
  }
  
}
