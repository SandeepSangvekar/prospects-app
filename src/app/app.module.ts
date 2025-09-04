import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sharedComponent/sidebar/sidebar.component';
import { LoginComponent } from './account/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserLogsComponent } from './user-management/user-logs/user-logs.component';
import { UserRolesComponent } from './user-management/user-roles/user-roles.component';
import { UserMasterComponent } from './user-management/user-master/user-master.component';
import { DatePipe } from '@angular/common';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';
import { CommonModule, registerLocaleData } from '@angular/common';
registerLocaleData(localeIn, 'en-IN');
import { LOCALE_ID } from '@angular/core';
import { HeaderInterceptor } from './_services/header.interceptor';

// import { DashboardComponent } from './dashbaord/dashboard/dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedComponentModule } from './sharedComponent/shared-component.module';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    UserLogsComponent,
    UserRolesComponent,
    UserMasterComponent,
    DashboardComponent, 
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MatProgressBarModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    // SharedModule
    SharedComponentModule,
    AppRoutingModule
    // RouterModule.forRoot([]),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true, },
    CurrencyPipe,
    DecimalPipe,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor()
  {
    // alert("hello")
  }
}
