import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {  

  seats = [1,3,5,7,9];
  
  loginStatus:any =  false;
  constructor(
    private store: Store<{ auth: { State: {} } }>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((data: any) => {
      this.loginStatus = (data.isAuthenticated);
      
      });
  }
  

}
