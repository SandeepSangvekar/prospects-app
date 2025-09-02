import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from 'src/app/sharedComponent/shared-component.module';
import { NewsletterComponent } from './newsletter/newsletter.component';


const routes:Routes=[
  { path:'newsletter',component:NewsletterComponent },
]

@NgModule({
  declarations: [
    NewsletterComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(routes)
  ]
})

export class MasterModule {
  constructor()
  {
    console.log("hiii")
  }
 }
