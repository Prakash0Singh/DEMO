import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './dashboard/services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private api: ApiService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          // this.api.logoutbtn();
          // localStorage.removeItem('token')
          localStorage.clear()
          window.location.reload()
        }
        // if (err.status == 500 || err.status == 502) {
        //   localStorage.setItem('status', JSON.stringify(err.status))
        //   this.router.navigate(['/404'])
        //   // window.location.reload()
        // }
        //console.log(err);
        return throwError(err.error);
      })
    );
  }
}