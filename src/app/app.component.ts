import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from './_services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription!: Subscription;

  constructor(
    public route: Router,
    public accountService: AccountService,
  ) { }

  ngOnInit(): void {
    //this code added for closing the modal and backdrop to handle accidentally navigating without closing the modal
    this.routerSubscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
    });
  }

  logout() {
    this.accountService.logout();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
