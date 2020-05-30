import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { services } from '../../app.service';
import { flightDetails } from '../../../models/flightDetails';
import { addPassengerDB } from 'src/models/addPassengerDB';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store'
import { addPessDialog } from '../../../Dialogs/addPessDialog'
import { updateDialog } from '../../../Dialogs/updateDialog'
import { ThemePalette } from '@angular/material/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AddItem } from 'src/Dialogs/addItemDialog';
import { addServiceDB } from 'src/models/addServiceDB';
import { updatePassengerDB } from 'src/models/updatePessangerDB';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  passportFStatus = false;
  AddressFStatus = false;
  DOBFStatus = false;
  lastAction: string;
  name: string;
  flightSelected;
  filterSelected;
  checkIn: any = "true";
  pId: any = 5;
  // Ancillary Services
  servicesList;
  mealsList;
  shoppingItemsList;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  flightData: flightDetails[];
  displayedColumns: string[] = ['PNR', 'Name', 'Services', 'SeatNo', 'Address', 'EditInfo'];
  filterList = [{ label: 'Passport', checked: false },
  { label: 'Address', checked: false },
  { label: 'DOB', checked: false }]
  dataSource;
  ServicesList = ["Food", "Water", "Coke"];
  pData: Observable<{ passengerData }>;

  constructor(
    public dialog: MatDialog,
    public dialog1: MatDialog,
    private service: services,
    private store: Store<{ PassengerData: { passengerData: addPassengerDB[] } }>
  ) { }

  ngOnInit() {
    this.getFlights();
    this.pData = this.store.select('PassengerData');

  }
  selectedFlightInfo(event: any) {
    this.flightSelected = event;
    this.getPassengersDetails(this.flightSelected);
    this.getServices(this.flightSelected);

  }
  AddPDialog(): void {
    const dialogRef = this.dialog.open(addPessDialog,
      { width: "300px", data: {} });
    dialogRef.afterClosed().subscribe(addPData => {
      this.pId++;
      let addPassenger = new addPassengerDB;
      addPassenger.pName = addPData.Name;
      addPassenger.Passport = addPData.PassportNo;
      addPassenger.Address = addPData.Address;
      addPassenger.fId = this.flightSelected;
      addPassenger.SeatNo = addPData.SeatNo;
      addPassenger.Check_In_Status = this.checkIn;
      addPassenger.PNR = addPData.PNR;
      this.service.addPassengers(addPassenger).subscribe((response) => {
        this.getPassengersDetails(this.flightSelected);

      });
      //console.log("d" + addPData.Name);
    })
  }
  UpdatePDialog(event: any): void {
    const updatePDialog = this.dialog.open(updateDialog,
      {
        width: "300px", data: {
          "Name": event.pName, "passportNo": event.Passport,
          "address": event.Address, "PNR": event.PNR
        }
      });
      updatePDialog.afterClosed().subscribe(updatePData => {
      this.pId++;
      console.log(updatePData);
      // Object to pass in Database
      let updatePassenger = new updatePassengerDB;
      updatePassenger.Name = updatePData.Name;
      updatePassenger.PassportNo = updatePData.PassportNo;
      updatePassenger.Address = updatePData.Address;
      updatePassenger.PNR = event.PNR;

      this.service.updatePassengers(updatePassenger).subscribe((response) => {
        //console.log("updated  Successfully & data source is");
        //console.log(this.dataSource);
        this.getPassengersDetails(this.flightSelected);
      });
    })
  }
  getFlights() {
    this.service.getFlights().subscribe((flightDat: any) => {
      for (let i in flightDat.data.result) {
        this.flightData = flightDat.data.result;
      }
    });

  }
  getPassengersDetails(flightId) {
    this.service.getPassengers(flightId).subscribe((passengerDat: any) => {
      for (let i in passengerDat.data.result) {
        this.dataSource = passengerDat.data.result;
      }
      console.log(this.dataSource);
    });
  }
  getServices(flightId) {
    this.service.getServices(flightId).subscribe((serviceData: any) => {
      this.servicesList = serviceData.data.result[0].fServices;
      this.mealsList = serviceData.data.result[0].fMeals;
      this.shoppingItemsList = serviceData.data.result[0].fShoppingItems;
    });
  }
  filter(event, item) {

    if (item == 'passport') {

      if (this.passportFStatus == true) {
        this.passportFStatus = !this.passportFStatus;
        this.filterSelected = "NONE";
      }
      else {
        this.passportFStatus = !this.passportFStatus;
        this.AddressFStatus = false;
        this.DOBFStatus = false;
        this.filterSelected = "Passport";
      }

    }
    else if (item == 'address') {
      if (this.AddressFStatus == true) {
        this.AddressFStatus = !this.AddressFStatus;
        this.filterSelected = "NONE";
      }
      else {
        this.AddressFStatus = !this.AddressFStatus;
        this.DOBFStatus = false;
        this.passportFStatus = false;
        this.filterSelected = "Address";
      }
    }
    else if (item == 'DOB') {
      if (this.DOBFStatus == true) {
        this.DOBFStatus = !this.DOBFStatus;
        this.filterSelected = "NONE";
      }
      else {
        this.DOBFStatus = !this.DOBFStatus;
        this.AddressFStatus = false;
        this.passportFStatus = false;
        this.filterSelected = "DOB";
      }
    }
  }
  addItem(data): void {
    const category = data;
    const dialogRef = this.dialog.open(AddItem,
      { width: "300px", data: {} });
    dialogRef.afterClosed().subscribe(ItemName => {
      if (category == 'fServices') {
        let addService = new addServiceDB;
        addService.Service = ItemName;
        addService.fId = this.flightSelected;
        addService.type = 'fServices'
        this.service.addAncillaryItems(addService).subscribe((response) => {
          this.getServices(this.flightSelected);
        });

      }
      else if (category == 'fMeals') {
        let addService = new addServiceDB;
        addService.Service = ItemName;
        addService.fId = this.flightSelected;
        addService.type = 'fMeals'
        this.service.addAncillaryItems(addService).subscribe((response) => {
          this.getServices(this.flightSelected);
        });
      }
      else if(category == 'fShoppingItems'){
        let addService = new addServiceDB;
        addService.Service = ItemName;
        addService.fId = this.flightSelected;
        addService.type = 'fShoppingItems'
        this.service.addAncillaryItems(addService).subscribe((response) => {
          this.getServices(this.flightSelected);
        });
      }

    })
    // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
  }
  remove(item,type): void {
    const index = this.servicesList.indexOf(item);
    if (type == 'fServices') {
      let addService = new addServiceDB;
      addService.Service = item;
      addService.fId = this.flightSelected;
      addService.type = 'fServices'
      this.service.removeAncillaryItems(addService).subscribe((response) => {
        this.getServices(this.flightSelected);
      });
    }
    else if (type == 'fMeals') {
      let addService = new addServiceDB;
      addService.Service = item;
      addService.fId = this.flightSelected;
      addService.type = 'fMeals'
      this.service.removeAncillaryItems(addService).subscribe((response) => {
        this.getServices(this.flightSelected);
      });
    }
    else if (type == 'fShoppingItems') {
      let addService = new addServiceDB;
      addService.Service = item;
      addService.fId = this.flightSelected;
      addService.type = 'fShoppingItems'
      this.service.removeAncillaryItems(addService).subscribe((response) => {
        this.getServices(this.flightSelected);
      });
    }

    //console.log(":items to remove is",item,type);
  
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
    if (category == 'Passport' || category == 'Address') {
      return data2 ? data2.filter(data => data['' + category] === "") : [];
    }
    else
      //console.log("category h", data2.category);
    return data2 ? data2.filter(data => data['' + category] == undefined) : [];
  }
}
