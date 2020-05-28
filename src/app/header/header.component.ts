import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from '../appStore/Actions/auth.actions'
import { User } from '../appStore/Reducers/userType.reducer';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent implements OnInit {

  title: String = 'Airlines';
  loginStatus: boolean = false;
  private userData: SocialUser;
  private loggedIn: boolean;

  constructor(private router: Router,
    private authService: AuthService,
    private store: Store<{ auth: { State: {} } }>) { }
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userData = user;
      this.store.select('auth').subscribe((data: any) => {
      this.loginStatus = (data.isAuthenticated);
      
      });
      this.loggedIn = (user != null);
    });
  }

  login(userType) {
    this.authService.signIn((GoogleLoginProvider.PROVIDER_ID), { prompt: 'select_account' }).then(() => {
      if (this.loggedIn) {
        this.store.dispatch(new authActions.Login(this.userData));
        sessionStorage.setItem("userData", JSON.stringify(this.userData));
        sessionStorage.setItem("IsLoggedIn", 'true');
        this.loginStatus = true;
        if (userType === "admin") {
          this.router.navigate(['/admin']);
        }
        else if (userType === "staff") {
          this.router.navigate(['/staff']);
        }
      }
    });
  }
  logOut() {
    this.authService.signOut();
    this.loginStatus = false;
    sessionStorage.removeItem("userPhoto");
    sessionStorage.setItem("IsLoggedIn", 'false');
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/'])
  }
}