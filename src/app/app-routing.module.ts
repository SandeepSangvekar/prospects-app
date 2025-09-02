import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { UserLogsComponent } from './user-management/user-logs/user-logs.component';
import { UserRolesComponent } from './user-management/user-roles/user-roles.component';
import { UserMasterComponent } from './user-management/user-master/user-master.component';




import { SignInComponent } from './account/sign-in/sign-in.component';
// import { DashboardComponent } from './dashbaord/dashboard/dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  {path: 'login', component: SignInComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  // {path: 'master',loadChildren: () => import('/masters/master.module').then((m) => m.MasterModule),canActivate: [AuthGuard]},
  {path:'master',loadChildren:()=>import('./master/master.module').then((m)=>m.MasterModule),canActivate:[AuthGuard]},
  // {path:'orders',loadChildren:()=>import('./orders/orders.module').then((m)=>m.OrdersModule),canActivate:[AuthGuard]},
  {path:'reports',loadChildren:()=>import('./reports/reports.module').then((m)=>m.ReportsModule),canActivate:[AuthGuard]},
  // {path:'transaction',loadChildren:()=>import('./transaction/transaction.module').then((m)=>m.TransactionModule),canActivate:[AuthGuard]},
  //dashboard
  //L2-schedule-bulkdata
  //Documentation-routing
//teder-documnets
 


 
  //presales tender list

  // Masters
  // {path: 'master',loadChildren: () => import('./masters/master.module').then((m) => m.MasterModule),canActivate: [AuthGuard]},
  //presales
  //execution


 
  {path: 'user-management/user-logs', component:UserLogsComponent, canActivate:[AuthGuard]},
  {path: 'user-management/user-roles', component:UserRolesComponent, canActivate:[AuthGuard]},
  {path: 'user-management/user-master', component:UserMasterComponent, canActivate:[AuthGuard]},
  //Store and Logistic (Warehouse)



  {path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
