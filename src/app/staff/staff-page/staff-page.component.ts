import { Component, OnInit } from '@angular/core';
import { flightDetails } from 'src/models/flightDetails';
import { services } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit {

  flightData: flightDetails[] ;
  flightSelected = null;
  flightNotSelectMsg = false;
  flightsLoaded = true;
  constructor(private service: services,
              private router: Router,
    ) { }

  ngOnInit(): void {
    this.getFlights();
    this.flightsLoaded =  !this.flightsLoaded ;
  }

  selectedFlightInfo(event: any) {
    this.flightSelected = event;
    localStorage.setItem('Selected_Flight', this.flightSelected);
    this.flightNotSelectMsg = false;
  }

  getFlights() {
    this.service.getFlights().subscribe((flightDat: any) => {
      this.flightsLoaded =  !this.flightsLoaded ;
      this.flightData = flightDat.data.result;
    });
  }

  checkIn() {
    if (this.flightSelected != null) {
      this.flightNotSelectMsg = false;
      this.router.navigate(['/staff/checkIn']);
    } else {
      this.flightNotSelectMsg = true;
    }

  }
  InFlight() {
    if (this.flightSelected != null) {
      this.flightNotSelectMsg = false;
      this.router.navigate(['/staff/InFlight']);
    } else {
      this.flightNotSelectMsg = true;
    }

  }
}
