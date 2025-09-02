import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginForm!: FormGroup;
  loading = false;
  res: any;
  userData: any;
  companyName = environment.companyName;
  responseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private accountService:AccountService,
    private route:Router,
    private alertService:AlertService,
  ) {
    localStorage.clear();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginName: [null, Validators.required],
      password: [null, Validators.required],
      // company:[null]
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  
  proceedLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
  
      const payload = {
        username: this.f['loginName'].value, // map to API field
        password: this.f['password'].value
      };
  
      this.accountService.proceedLogin(payload).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status === true) {
            this.responseData = res;
            localStorage.setItem('gdUserData', JSON.stringify(res));
            // this.route.navigate(['dashboard']);
            this.route.navigate(['master/newsletter']);
            this.alertService.success("Login Successful.");
          } else {
            this.alertService.error("Username or password is incorrect.");
          }
        },
        (error: any) => {
          console.error(error);
          this.loading = false;
          this.alertService.error(
            error.status === 401
              ? 'Username or password is incorrect.'
              : "Error: Unknown Error!"
          );
        }
      );
    }
  }

  // proceedLogin(): void {
  //   if (this.loginForm.valid) {
  //     this.loading = true;
  
  //     const payload = {
  //       username: this.f['loginName'].value,
  //       password: this.f['password'].value
  //     };
  
  //     this.accountService.proceedLogin(payload).subscribe(
  //       (res: any) => {
  //         this.loading = false;
  //         if (res.status === true && res.token) {
  //           // Save only token and user info separately
  //           localStorage.setItem('gdToken', res.token);
  //           localStorage.setItem('gdUser', JSON.stringify(res.data));
  
  //           this.route.navigate(['dashboard']);
  //           this.alertService.success("Login Successful.");
  //         } else {
  //           this.alertService.error("Username or password is incorrect.");
  //         }
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         this.loading = false;
  //         this.alertService.error(
  //           error.status === 401
  //             ? 'Username or password is incorrect.'
  //             : "Error: Unknown Error!"
  //         );
  //       }
  //     );
  //   }
  // }
  
  
  // proceedLogin() {
  //   if (this.loginForm.valid) {
  //     this.loading = true;
  
  //     // Hardcoded credentials
  //     const hardcodedUser = {
  //       loginName: 'admin',
  //       password: 'admin123'
  //     };
  
  //     if (
  //       this.f['loginName'].value === hardcodedUser.loginName &&
  //       this.f['password'].value === hardcodedUser.password
  //     ) {
  //       // Fake response data
  //       const responseData = {
  //         status: 200,
  //         user: {
  //           id: 1,
  //           name: 'Admin User',
  //           role: 'Admin'
  //         }
  //       };
  
  //       // Save fake user to localStorage
  //       localStorage.setItem('gdUserData', JSON.stringify(responseData));
  
  //       // Navigate without reload
  //       this.route.navigate(['dashboard']);
  //       this.alertService.success("Login Successful!");
  //     } else {
  //       this.alertService.error("Username or password is incorrect.");
  //     }
  
  //     this.loading = false;
  //   } else {
  //     this.alertService.error("Invalid Details, Please check once.");
  //   }
  // }

  
}
