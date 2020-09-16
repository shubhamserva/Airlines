import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { services } from '../../app.service';
import { flightDetails } from '../../../models/flightDetails';
import { addPassengerDB } from 'src/models/addPassengerDB';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddPessDialog } from '../../../Dialogs/addPessDialog';
import { UpdateDialog } from '../../../Dialogs/updateDialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AddItem } from 'src/Dialogs/addItemDialog';
import { addServiceDB } from 'src/models/addServiceDB';
import { updatePassengerDB } from 'src/models/updatePessangerDB';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

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
  checkIn: any = 'false';
  pId: any = 5;
  // Ancillary Services
  servicesList;
  mealsList;
  shoppingItemsList;
  flightsLoaded = true;
  passengerDataLoaded = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  flightData: flightDetails[];
  displayedColumns: string[] = ['PNR', 'Name', 'Services', 'SeatNo', 'Address', 'EditInfo', 'DOB', 'Passport'];
  filterList = [{ label: 'Passport', checked: false },
  { label: 'Address', checked: false },
  { label: 'DOB', checked: false }];
  dataSource;
  ServicesList = ['Food', 'Water', 'Coke'];
  pData: Observable<{ passengerData }>;

  constructor(
    public dialog: MatDialog,
    public dialog1: MatDialog,
    private service: services,
    private snackBar: MatSnackBar,
    private store: Store<{ PassengerData: { passengerData: addPassengerDB[] } }>
  ) { }

  ngOnInit() {
    this.getFlights();
    this.flightsLoaded = false;
    this.pData = this.store.select('PassengerData');

  }
  selectedFlightInfo(event: any) {
    this.flightSelected = event;
    this.getPassengersDetails(this.flightSelected);
    this.getServices(this.flightSelected);

  }
  AddPDialog(): void {
    const dialogRef = this.dialog.open(AddPessDialog,
      { width: '400px', height: '400px', data: {} });
    dialogRef.afterClosed().subscribe(addPData => {
      if (addPData) {
        this.pId++;
        const addPassenger = new addPassengerDB();
        addPassenger.pName = addPData.value.name;
        addPassenger.Passport = addPData.value.passport;
        addPassenger.Address = addPData.value.Address;
        addPassenger.fId = this.flightSelected;
        addPassenger.Check_In_Status = this.checkIn;
        addPassenger.PNR = addPData.value.PNR;
        addPassenger.WheelChair = addPData.value.wheelchair;
        addPassenger.Infant = addPData.value.infant;
        addPassenger.DOB = addPData.value.DOB;
        this.service.addPassengers(addPassenger).subscribe((result) => {
          this.getPassengersDetails(this.flightSelected);
          this.openSnackBar('');
        });
      }
    });
  }
  UpdatePDialog(event: any): void {
    const updatePDialog = this.dialog.open(UpdateDialog,
      {
        width: '300px', data: {
          Name: event.pName, passportNo: event.Passport,
          address: event.Address, PNR: event.PNR
        }
      });
    updatePDialog.afterClosed().subscribe(updatePData => {
      if (updatePData) {
        this.pId++;
        const updatePassenger = new updatePassengerDB();
        updatePassenger.Name = updatePData.Name;
        updatePassenger.PassportNo = updatePData.PassportNo;
        updatePassenger.Address = updatePData.Address;
        updatePassenger.PNR = event.PNR;
        this.service.updatePassengers(updatePassenger).subscribe((response) => {
          this.getPassengersDetails(this.flightSelected);
        });
      }

    });
  }
  getFlights() {
    this.service.getFlights().subscribe((flightDat: any) => {
      this.flightsLoaded = ! this.flightsLoaded;
      this.flightData = flightDat.data.result;
    });

  }
  getPassengersDetails(flightId) {
    this.passengerDataLoaded = ! this.passengerDataLoaded;
    this.service.getPassengers(flightId).subscribe((passengerDat: any) => {
      this.passengerDataLoaded = ! this.passengerDataLoaded;
      this.dataSource = passengerDat.data.result;
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

    if (item === 'passport') {

      if (this.passportFStatus === true) {
        this.passportFStatus = !this.passportFStatus;
        this.filterSelected = 'NONE';
      } else {
        this.passportFStatus = !this.passportFStatus;
        this.AddressFStatus = false;
        this.DOBFStatus = false;
        this.filterSelected = 'Passport';
      }
    } else if (item === 'address') {
      if (this.AddressFStatus === true) {
        this.AddressFStatus = !this.AddressFStatus;
        this.filterSelected = 'NONE';
      } else {
        this.AddressFStatus = !this.AddressFStatus;
        this.DOBFStatus = false;
        this.passportFStatus = false;
        this.filterSelected = 'Address';
      }
    } else if (item === 'DOB') {
      if (this.DOBFStatus === true) {
        this.DOBFStatus = !this.DOBFStatus;
        this.filterSelected = 'NONE';
      } else {
        this.DOBFStatus = !this.DOBFStatus;
        this.AddressFStatus = false;
        this.passportFStatus = false;
        this.filterSelected = 'DOB';
      }
    }
  }
  addItem(data): void {
    const category = data;
    const dialogRef = this.dialog.open(AddItem,
      { width: '300px', data: {} });
    dialogRef.afterClosed().subscribe(ItemName => {
      if (ItemName) {
      if (category === 'fServices') {
        const addService = new addServiceDB();
        addService.Service = ItemName;
        addService.fId = this.flightSelected;
        addService.type = 'fServices';
        this.service.addAncillaryItems(addService).subscribe((response) => {
          this.getServices(this.flightSelected);
        });

      } else if (category === 'fMeals') {
        const addService = new addServiceDB();
        addService.Service = ItemName;
        addService.fId = this.flightSelected;
        addService.type = 'fMeals';
        this.service.addAncillaryItems(addService).subscribe((response) => {
          this.getServices(this.flightSelected);
        });
      } else if (category === 'fShoppingItems') {
        const addService = new addServiceDB();
        addService.Service = ItemName;
        addService.fId = this.flightSelected;
        addService.type = 'fShoppingItems';
        this.service.addAncillaryItems(addService).subscribe((response) => {
          this.getServices(this.flightSelected);
        });
      }
    }
    });
  }
  remove(item, type): void {
    const index = this.servicesList.indexOf(item);
    if (type === 'fServices') {
      const addService = new addServiceDB();
      addService.Service = item;
      addService.fId = this.flightSelected;
      addService.type = 'fServices';
      this.service.removeAncillaryItems(addService).subscribe((response) => {
        this.getServices(this.flightSelected);
      });
    } else if (type === 'fMeals') {
      const addService = new addServiceDB();
      addService.Service = item;
      addService.fId = this.flightSelected;
      addService.type = 'fMeals';
      this.service.removeAncillaryItems(addService).subscribe((response) => {
        this.getServices(this.flightSelected);
      });
    } else if (type === 'fShoppingItems') {
      const addService = new addServiceDB();
      addService.Service = item;
      addService.fId = this.flightSelected;
      addService.type = 'fShoppingItems';
      this.service.removeAncillaryItems(addService).subscribe((response) => {
        this.getServices(this.flightSelected);
      });
    }
  }
  openSnackBar( action: string) {
    this.snackBar.open('Passenger updated Successfully', action, {
      duration: 2000,
    });
  }
}

@Pipe({ name: 'Filter' })
export class Filter implements PipeTransform {
  transform(data2: any, category: string): any {
    if (!category) {
      return data2;
    } else if (category === 'NONE') {
      return data2;
    } else if (category === 'Passport') {
      return data2.filter(data => data.Passport == null || data.Passport === '');
    } else if (category === 'Address') {
      return data2.filter(data => data.Address == null || data.Address === '');
    } else if (category === 'DOB') {
      return data2.filter(data => data.DOB == null || data.DOB === '');
    }

  }
}
