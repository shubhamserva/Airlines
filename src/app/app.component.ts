import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import * as authActions from './appStore/Actions/auth.actions'
import { Store } from '@ngrx/store';
import { User } from './appStore/Reducers/userType.reducer';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  subscription: Subscription;
  constructor(private  router: Router,
    private store: Store<{ userReducer: { states: User } }>,)
    {
    this.subscription = router.events.subscribe((event) => {
      if(sessionStorage.getItem("IsLoggedIn") == 'true'){
        this.store.dispatch(new authActions.Login(sessionStorage.getItem("userData")));
      }
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  })
  }
  
  ngOnInit()  {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
