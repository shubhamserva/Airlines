import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { services } from '../../app.service';
import {addPassengerDialog} from '../../../models/addPassengerDialog'; 
import {flightDetails} from '../../../models/flightDetails'; 
import { addPassengerDB } from 'src/models/addPassengerDB';
import { Observable } from 'rxjs';
import{Store} from '@ngrx/store'
import { updatePassengerDialog } from '../../../models/updatePassengerDialog';
import {PassengerDataReducer} from '../../appStore/Reducers/app.reducer'
import * as adminActions from '../../appStore/Actions/app.action'
import {AddService} from '../../../Dialogs/AddServiceDialog'
import {customDialog} from '../../../Dialogs/customDialog'  
import {updateDialog} from '../../../Dialogs/updateDialog'


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
  checkIn :any = "true";
  pId:any = 5;
  flightData: flightDetails[] ;
  displayedColumns: string[] = ['PNR', 'Name', 'Services', 'SeatNo','Address', 'EditInfo','EditServices'];
  filterList = [{label:'Passport',checked:false}, 
                {label:'Address',checked:false},
                {label:'DOB',checked:false} ]
  dataSource;
  filterDataSource;
  ServicesList = ["Food","Water","Coke"];
  pData:Observable<{passengerData}> ;

  constructor(
    public dialog: MatDialog, 
    public dialog1: MatDialog, 
    private service: services, 
    private store : Store<{PassengerData:{passengerData:addPassengerDB[]}}>
    ) { }

  ngOnInit() {
    this.getFlights();
    this.pData = this.store.select('PassengerData');
  }
  selectedFlightInfo(event:any){
    this.flightSelected = event;
    console.log("FLIGHT CHANGED");
    this.getPassengersDetails(this.flightSelected);
  }
  AddPDialog(): void {
    const dialogRef = this.dialog.open(customDialog,
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
      this.service.addPassengers(addPassenger).subscribe((response)=>{
        this.getPassengersDetails(this.flightSelected);
      
      });
      console.log("d"+ addPData.Name); 
    })
  } 
  UpdatePDialog(event:any): void {
    const dialogRef1 = this.dialog.open(updateDialog,
      { width: "300px", data :{"Name":event.pName,"passportNo":event.Passport,
      "address":event.Address,"PNR":event.PNR }})  ;
      dialogRef1.afterClosed().subscribe(updatePData => { 
        this.pId++;
        console.log(updatePData);
        let updatePassenger = new addPassengerDB;
        updatePassenger.pName = updatePData.Name;
        updatePassenger.Passport = updatePData.passportNo;
        updatePassenger.Address = updatePData.address;
        updatePassenger.fId = this.flightSelected;
        updatePassenger.PNR = event.PNR;
        this.service.updatePassengers(updatePassenger).subscribe((response)=>{
          console.log("updated  Successfully & data source is");
          console.log(this.dataSource);

          this.getPassengersDetails(this.flightSelected);
        });
     })
  }
  getFlights() {
    this.service.getFlights().subscribe((flightDat:any) => {
      for(let i in flightDat.data.result){
        this.flightData = flightDat.data.result;
      }
    });

  }
  getPassengersDetails(flightId){
    this.service.getPassengers(flightId).subscribe((passengerDat:any)=>{
      for(let i in passengerDat.data.result){
        this.dataSource = passengerDat.data.result;
      }
      console.log(this.dataSource);
    });
  }
  filter(event,item){

    if (item == 'passport') {

      if(this.passportFStatus == true){
        this.passportFStatus = !this.passportFStatus;
        this.filterSelected = "NONE";
      }
      else{
        this.passportFStatus = !this.passportFStatus;
        this.AddressFStatus = false;
        this.DOBFStatus = false;
        this.filterSelected = "Passport";
      }
     
    }
    else if (item == 'address') {
      if(this.AddressFStatus == true){
        this.AddressFStatus = !this.AddressFStatus;
        this.filterSelected = "NONE";
      }
      else{
      this.AddressFStatus = !this.AddressFStatus;
      this.DOBFStatus = false;
      this.passportFStatus = false;
      this.filterSelected = "Address";
      }
    }
    else if (item == 'DOB') { 
      if(this.DOBFStatus == true){
        this.DOBFStatus = !this.DOBFStatus;
        this.filterSelected = "NONE";
      }
      else{
      this.DOBFStatus = !this.DOBFStatus;
      this.AddressFStatus = false;
      this.passportFStatus = false;
      this.filterSelected = "DOB";
      }
    }
  }
  addservice(event:any){
    this.dialog.open(AddService,{ width: "300px", data: {} }).afterClosed().subscribe((serviceDialog)=>{
      console.log("data added in service is "+ serviceDialog);
    })  
  }

}

@Pipe({ name: 'Filter' })
export class Filter implements PipeTransform {
  transform(data2: any, category: String): any {
    if (!category) {
      return data2;
    }
    if(category == 'NONE'){
      return data2 ;
    }
    if(category == 'Passport' || category == 'Address' ){ 
      return data2 ? data2.filter(data => data['' + category] === "") : [];
    }
    else
    console.log("category h", data2.category);
    return data2 ? data2.filter(data => data['' + category] == undefined) : [];
  }
}


