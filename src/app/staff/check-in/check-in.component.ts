import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { seat } from '../../../models/seat'
import { checkIn } from 'src/models/checkInDB';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})

export class CheckInComponent implements OnInit {

  isPNRpresent;
  isSeatConfirm;
  isAlreadyChecked;
  SeatSelectMsg = true;
  successMsg = false;
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
  checkInFlag = false;
  previousSeat = null;
  currentSeat = null;
  seatStatus;
  checkInPNR;
  filterList = [{ label: 'Passport', checked: false },
  { label: 'Address', checked: false },
  { label: 'DOB', checked: false }]

  constructor(
    private service: services,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.flightSeleted = localStorage.getItem("Selected_Flight");
    //console.log(this.flightSeleted);
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

      if (this.infantStatus == true) {
        this.infantStatus = !this.infantStatus;
        this.filterSelected = "NONE";
      }
      else {
        this.infantStatus = !this.infantStatus;
        this.checkINFilter = false;
        this.notCheckINFilter = false;
        this.wheelchairFilter = false;
        this.filterSelected = "Infant";
      }
    }
    else if (item == 'wheelchair') {

      if (this.wheelchairFilter == true) {
        this.wheelchairFilter = !this.wheelchairFilter;
        this.filterSelected = "NONE";
      }
      else {
        this.wheelchairFilter = !this.wheelchairFilter;
        this.checkINFilter = false;
        this.notCheckINFilter = false;
        this.infantStatus = false;
        this.filterSelected = "WheelChair";
      }
    }
    else if (item == 'nonChecked') {

      if (this.notCheckINFilter == true) {
        this.notCheckINFilter = !this.notCheckINFilter;
        this.filterSelected = "NONE";
      }
      else {
        this.notCheckINFilter = !this.notCheckINFilter;
        this.checkINFilter = false;
        this.wheelchairFilter = false;
        this.infantStatus = false;
        this.filterSelected = "NotChecked";
      }
    }
    else if (item == 'checked') {
      if (this.checkINFilter == true) {
        this.checkINFilter = !this.checkINFilter;
        this.filterSelected = "NONE";
      }
      else {
        this.checkINFilter = !this.checkINFilter;
        this.notCheckINFilter = false;
        this.wheelchairFilter = false;
        this.infantStatus = false;
        this.filterSelected = "Check_In_Status";
      }
    }

  }
  SeatSelected(event, item) {
    if (this.checkInFlag == false) { }
    else {
      (this.seats).find(p => p.No === item && (this.seatStatus = p.Status));
      if (this.seatStatus == true) {
      }
      else {
        this.isSeatConfirm = true;
        this.SeatSelectMsg = true;
        this.currentSeat = item;
        (this.seats).find(p => p.No === item && (p.Status = !p.Status));
        if (this.previousSeat == null) {
          this.previousSeat = item;
        }
        else {
          (this.seats).find(p => p.No === this.previousSeat && (p.Status = !p.Status));
          this.previousSeat = item;
        }
      }
    }
  }
  ChangeSeat(data) {
    this.SeatSelectMsg = false;
    this.checkInFlag = true;
    //console.log("dat is", data);
    (this.seats).find(p => p.No === data.SeatNo && (p.Status = !p.Status));
    this.checkInPNR = data.PNR;
  }
  checkIn() {
    for (let item of this.dataSource) {
      // To check if PNR is present in passenger list
      if (item.PNR == this.checkInPNR) {
        if (item.SeatNo != null) {
          //console.log("is al check me aaya");
          this.isAlreadyChecked = true;
          setTimeout(() => {
            this.isAlreadyChecked = false;
          }, 1500);
          break;
        }
        else {
          //console.log("bahar aaya");
          this.isPNRpresent = false
          this.SeatSelectMsg = false;
          this.checkInFlag = true;
          break;
        }

      }
      else {
        this.isPNRpresent = true;
        setTimeout(() => {
          this.isPNRpresent = false;
        }, 1500);
      }
    }
  }
  confirmSeat() {
    //console.log("confirm seat me aaya");
    if (this.currentSeat != null) {
      this.isSeatConfirm = false;
      this.SeatSelectMsg = true;
      this.checkInFlag = false;
      let data = new checkIn;
      data.PNR = this.checkInPNR;
      data.SeatNo = this.currentSeat;
      this.service.checkIn(data).subscribe(() => {
        this.successMsg = true;
        this.getPassengersDetails(this.flightSeleted);
        setTimeout(() => {
          this.successMsg = false;
        }, 2000);
      });
    }
  }
}

@Pipe({ name: 'Filter' })
export class Filter implements PipeTransform {
  transform(data2: any, category: String): any {
    if (!category) {
      return data2;
    }
    if (category == 'NONE') {
      return data2;
    }
    else if (category == 'NotChecked') {
      return data2 ? data2.filter(data => data['' + category] == false) : [];
    }
    else
      return data2 ? data2.filter(data => data['' + category] == true) : [];
  }
}
