import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { addShopItem } from 'src/models/addShopItemDB';
import { updateMealDB } from 'src/models/updateMealDB';
import { updateMeal } from 'src/Dialogs/updateMeal';
import { UpdateService } from 'src/Dialogs/updateServiceDialog';
import { addService } from 'src/models/addServiceModelDB';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.css']
})
export class InFlightComponent implements OnInit {

  flightSeleted;
  displayedColumns: string[] = ['PNR', 'SeatNo', 'ShopRequests', 'Add_ShopRequests',
                                'MealPrefrence','changeMeal','Services','updateServices'];
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
    console.log("data updated and loaded again")
    this.service.getPassengers(flightId).subscribe((passengerDat: any) => {
      this.dataSource = passengerDat.data.result;
      console.log("data aaya",this.dataSource);

    });
  }
  addShopItem(event:any) {
    this.dialog.open(AddShopItem, { width: "300px", data: {} }).
    afterClosed().subscribe((shopItem) => {
      let addshopItemDB = new addShopItem;
      addshopItemDB.ShoppingItem = shopItem.Name
      addshopItemDB.PNR = event.PNR
      
      this.service.addShoppingItem(addshopItemDB).subscribe((response)=>{
        console.log("response in add shop item",response)
        this.getPassengersDetails(this.flightSeleted);  
    })
  })
  }
  addServices(event){
    this.dialog.open(UpdateService, { width: "300px", data: {
      "services":event.services
    } }).
    afterClosed().subscribe((serviceDialog)=>{
      let addserviceDB = new addService;
      addserviceDB.ServiceName = serviceDialog.Services
      addserviceDB.PNR = event.PNR
      this.service.addServies(addserviceDB).subscribe((response)=>{
        this.getPassengersDetails(this.flightSeleted);
    })
    })  
  }
  changeMeal(event:any){
    this.dialog.open(updateMeal, {
      width: "300px", data: {
        "services": event.Services
      }
    }).
      afterClosed().subscribe((mealData) => {
        let updateMeal = new updateMealDB;
        updateMeal.Meal = mealData
        updateMeal.PNR = event.PNR
        this.service.updateMeal(updateMeal).subscribe((response) => {
          this.getPassengersDetails(this.flightSeleted);
        })
      })
  }
}
