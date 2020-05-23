import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {  

  seats = [1,3,5,7,9];
  constructor() { }

  ngOnInit(): void {
  }

}
