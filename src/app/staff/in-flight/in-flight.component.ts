import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { AddService } from 'src/Dialogs/AddServiceDialog';
import { addShopItem } from 'src/models/addShopItemDB';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.css']
})
export class InFlightComponent implements OnInit {

  flightSeleted;
  displayedColumns: string[] = ['PNR', 'Services', 'SeatNo', 'AddServices', 'ShopRequests', 'Add_ShopRequests','MealPrefrence'];
  dataSource;
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

    });
  }
  addShopItem(event:any) {
    this.dialog.open(AddShopItem, { width: "300px", data: {} }).
    afterClosed().subscribe((shopItem) => {
      console.log("Event add shop is ");
      console.log(event);
      console.log(shopItem);
      let addshopItemDB = new addShopItem;
      addshopItemDB.ShoppingItem = shopItem.Name
      addshopItemDB.PNR = event.PNR
      
      this.service.addShoppingItem(addshopItemDB).subscribe((response)=>{
        console.log("Event add shop is ");
      console.log(event);
        console.log("updated  Successfully & data source is");
        console.log(response);
    })
  })
  }
  addservice(event:any){
    this.dialog.open(AddService, { width: "300px", data: {} }).
    afterClosed().subscribe((serviceDialog)=>{
      let addserviceDB = new addShopItem;
      addserviceDB.ShoppingItem = serviceDialog.Name
      addserviceDB.PNR = event.PNR
      console.log(event);
      console.log(serviceDialog);
    //   this.service.addServies(addserviceDB).subscribe((response)=>{
    //     console.log("Event add shop is ");
    //   console.log(event);
    //     console.log("updated  Successfully & data source is");
    //     console.log(response);
    // })
    })  
  }
}
