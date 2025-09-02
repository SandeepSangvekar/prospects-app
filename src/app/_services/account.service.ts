import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService, EncryptionService } from './index';

export interface Users {
  loginName: string;
  password: string;
  company: string; // Add this to include companyID
}

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private http: HttpClient,
    private route: Router,
    private alertService: AlertService,
    private encryptionService: EncryptionService
  ) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('gdUserData'));
    this.user = this.userSubject.asObservable();
  }

  // proceedLogin(userCred: Users): Observable<any[]> {
  //   debugger
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  //   // Update the `companyID` in the environment dynamically
  //   environment.companyID = userCred.company;
    
  //   return this.http.post<any[]>(`${environment.apiUrl}/users/login`, userCred, httpOptions).pipe(map((userData: any) => {
  //     if (userData.status == true) {
  //       localStorage.setItem('gdUserData', JSON.stringify(userData));
  //       // this.encryptionService.saveToIndexedDB(environment.indexedDB.keyName, userData?.rolemenus);

  //       this.userSubject = userData;
  //       return userData;
  //     } else {
  //       return '';
  //     }
  //   }));
  // }

  proceedLogin(userCred: any) { 
    let headers_object = new HttpHeaders({ 'Content-Type': 'application/json'});
    let httpOptions = { headers: headers_object };
    return this.http.post<any[]>
    (`${environment.apiUrl}/users/login`, userCred, httpOptions).pipe(map((userData: any) => {
      if (userData.status == true) {
        localStorage.setItem('gdUserData', JSON.stringify(userData));
        this.userSubject = userData;
        return userData;
      } else {
        return '';
      }
    }));
  }
  /**
  * Encrypt data and save to IndexedDB
  * @param roleData - The data to store (will be encrypted).
  */
  // async saveRoleInIndexDB(roleData: any) {
  //   await 
  // }

  getusertoken() {
    return localStorage.getItem('gdUserData');
  }

  gettoken() {
    return !!localStorage.getItem('gdUserData');
  }

  isLoggedIn() {
    return !!localStorage.getItem('gdUserData');
  }

  logout() {
    localStorage.removeItem('gdUserData');
    this.encryptionService.removeFromIndexedDB(environment.indexedDB.keyName);
    localStorage.clear();
    this.route.navigate(['/login']);
    this.alertService.success("Logout Successfully.");
  }

  getpwd(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/user/api/v1/updatepassword1`, data);
  }

}
