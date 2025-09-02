import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '../sharedComponent/shared-component.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SendmailerComponent } from './sendmailer/sendmailer.component';
import { ActivityLogsComponent } from './activity-logs/activity-logs.component';
const routes:Routes=[
  { path:'send-mailer',component:SendmailerComponent },
  { path:'activity-logs',component:ActivityLogsComponent },
]

@NgModule({
  declarations: [
    SendmailerComponent,
    ActivityLogsComponent
    
  ],
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ReportsModule { }
