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
  flightNotSelectMsg: boolean = false;
  
  constructor(private service: services,
              private router: Router,    
    ) { }

  ngOnInit(): void {
    this.getFlights();
  }

  selectedFlightInfo(event:any){
    this.flightSelected = event;
    localStorage.setItem("Selected_Flight",this.flightSelected);
    this.flightNotSelectMsg = false;
   //  this.getPassengersDetails(this.flightSelected);
  }

  getFlights() {
    this.service.getFlights().subscribe((flightDat:any) => {
      for(let i in flightDat.data.result){
        this.flightData = flightDat.data.result;
      }
    });

  }

  checkIn(){
    if(this.flightSelected != null){
      this.flightNotSelectMsg = false;
      this.router.navigate(['/staff/checkIn']);
    }
    else {
      this.flightNotSelectMsg = true;
    }
    
  }
  InFlight(){
    if(this.flightSelected != null){
      this.flightNotSelectMsg = false;
      this.router.navigate(['/staff/InFlight'])
    }
    else {
      this.flightNotSelectMsg = true;
    }
    
  }
}
