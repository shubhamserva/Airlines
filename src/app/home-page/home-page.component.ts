import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  loginStatus: any =  false;
  constructor(
    private store: Store<{ auth: { State: {} } }>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((data: any) => {
      if (data) {
        this.loginStatus = (data.isAuthenticated);
      }
      });
  }
}
