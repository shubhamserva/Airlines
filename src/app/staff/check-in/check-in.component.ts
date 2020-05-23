import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { seat } from '../../../models/seat'
import { checkIn } from 'src/models/checkInDB';
import { changeSeat } from 'src/Dialogs/changeSeat';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})



export class CheckInComponent implements OnInit {

  seats: any = seat;
  flightSeleted;
  checkINFilter = false;
  notCheckINFilter = false;
  wheelchairFilter = false;
  infantStatus = false;
  filterSelected: String;
  displayedColumns: string[] = ['PNR', 'Name', 'Services', 'SeatNo', 'ChangeSeat'];
  dataSource = undefined;
  filterDataSource;
  filterList = [{ label: 'Passport', checked: false },
  { label: 'Address', checked: false },
  { label: 'DOB', checked: false }]

  constructor(
    private service: services,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.flightSeleted = localStorage.getItem("Selected_Flight");
    console.log(this.flightSeleted);
    this.getPassengersDetails(this.flightSeleted);
  }


  getPassengersDetails(flightId) {
    this.service.getPassengers(flightId).subscribe((passengerDat: any) => {
      this.dataSource = passengerDat.data.result;
      for (let item of this.dataSource) {
        if (item.Check_In_Status == true) {
          (this.seats).find(p => p.No === item.SeatNo && (p.Status = true));
        }
      }
    });
  }
  filter(event, item) {

    if (item == 'Infant') {

      if(this.infantStatus ==true){
        this.infantStatus = !this.infantStatus;
        this.filterSelected = "NONE";
      }
      else{
        this.infantStatus = !this.infantStatus;
      this.checkINFilter = false;
      this.notCheckINFilter = false;
      this.wheelchairFilter = false;
      this.filterSelected = "Infant";
      }
    }
    else if (item == 'wheelchair') {

      if(this.wheelchairFilter ==true){
        this.wheelchairFilter = !this.wheelchairFilter;
        this.filterSelected = "NONE";
      }
      else{
      this.wheelchairFilter = !this.wheelchairFilter;
      this.checkINFilter = false;
      this.notCheckINFilter = false;
      this.infantStatus = false;
      this.filterSelected = "WheelChair";
      }
    }
    else if (item == 'nonChecked') {

      if(this.notCheckINFilter ==true){
        this.notCheckINFilter = !this.notCheckINFilter;
        this.filterSelected = "NONE";
      }
      else{
      this.notCheckINFilter = !this.notCheckINFilter;
      this.checkINFilter = false;
      this.wheelchairFilter = false;
      this.infantStatus = false;
      this.filterSelected = "NotChecked";
      }
    }
    else if (item == 'checked') {
      if(this.checkINFilter ==true){
        this.checkINFilter = !this.checkINFilter;
        this.filterSelected = "NONE";
      }
      else{
      this.checkINFilter = !this.checkINFilter;
      this.notCheckINFilter = false;
      this.wheelchairFilter = false;
      this.infantStatus = false;
      this.filterSelected = "Check_In_Status";
      }
    }

  }
  SeatSelected(event, item) {
    (this.seats).find(p => p.No === item && (p.Status = !p.Status));
    let data = new checkIn;
    let PNR;
    (this.dataSource).find(p => p.SeatNo === item && (PNR = p.PNR));
    data.PNR = PNR;
    data.SeatNo = item;
    this.service.checkIn(data).subscribe();
  }
  ChangeSeat(data) {
    this.dialog.open(changeSeat, { width: "300px", data: {} }).afterClosed().subscribe((seatNo) => {
      (this.dataSource).find(p => p.PNR === data.PNR && (p.SeatNo = seatNo.SeatNo));
      let DBdata = new checkIn;
      DBdata.PNR = data.PNR;
      DBdata.SeatNo = seatNo.SeatNo;
      this.service.changeSeat(DBdata).subscribe();
    }
    )
  }
}

@Pipe({ name: 'Filter' })
export class Filter implements PipeTransform {
  transform(data2: any, category: String): any {
    if (!category) {
      return data2;
    }
    if(category == 'NONE'){
      return data2;
    }
    else if(category == 'NotChecked'){ 
      return data2 ? data2.filter(data => data['' + category] == false) : [];
    }
    else 
    return data2 ? data2.filter(data => data['' + category] == true) : [];
  }
}
