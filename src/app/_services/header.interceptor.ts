import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService, AlertService } from './index';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ✅ Get token from localStorage (you saved full response as 'gdUserData')
    const userData = localStorage.getItem('gdUserData');
    let token: string | null = null;

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        token = parsedData?.token;   // your API returns { status, token, data }
      } catch (err) {
        token = null;
      }
    }

    // ✅ If token exists, clone request and add Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.accountService.logout();
          this.alertService.error('Login Expired, Please login again!');
        }
        return throwError(() => error);
      })
    );
  }
}
