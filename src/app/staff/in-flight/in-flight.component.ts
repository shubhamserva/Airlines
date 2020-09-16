import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { AddShopItem } from 'src/Dialogs/AddShopItemDialog';
import { addShopItem } from 'src/models/addShopItemDB';
import { updateMealDB } from 'src/models/updateMealDB';
import { UpdateMeal } from 'src/Dialogs/updateMeal';
import { UpdateService } from 'src/Dialogs/updateServiceDialog';
import { addService } from 'src/models/addServiceModelDB';
import { seat } from 'src/models/seat';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.css'],
})
export class InFlightComponent implements OnInit {
  flightSeleted;
  displayedColumns: string[] = [
    'PNR',
    'SeatNo',
    'ShopRequests',
    'Add_ShopRequests',
    'MealPrefrence',
    'changeMeal',
    'Services',
    'updateServices',
  ];
  dataSource;
  servicesList;
  mealsList;
  shoppingItemsList;
  selectedMeal;
  selectedShoppingItem;
  selectedService;

  seats: any = seat;
  constructor(private service: services, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.flightSeleted = localStorage.getItem('Selected_Flight');
    this.getPassengersDetails(this.flightSeleted);
    this.getServices(this.flightSeleted);

  }

  getPassengersDetails(flightId) {
    this.service.getPassengers(flightId).subscribe((passengerDat: any) => {
      this.dataSource = passengerDat.data.result;
      // Using infant as special meal color

      for (const item of this.dataSource) {
        if (item.Check_In_Status === true) {
          this.seats.find((p) => p.No === item.SeatNo && (p.Status = true));
        }
        if (item.food != null) {
          this.seats.find((p) => p.No === item.SeatNo && (p.infant = true));
        }
      }
    });
  }
  getServices(flightId) {
    this.service.getServices(flightId).subscribe((serviceData: any) => {
      this.servicesList = serviceData.data.result[0].fServices;
      this.mealsList = serviceData.data.result[0].fMeals;
      this.shoppingItemsList = serviceData.data.result[0].fShoppingItems;
    });
  }
  changeMeal(mealData, rowNo) {

    if (mealData) {
      // tslint:disable-next-line:no-shadowed-variable
       const updateMeal = new updateMealDB();
       updateMeal.Meal =  mealData.value;
       updateMeal.PNR = rowNo.PNR;
       this.service.updateMeal(updateMeal).subscribe((response) => {
         this.getPassengersDetails(this.flightSeleted);
      });
    }
  }
  addShopItem(event: any, rowNo) {
        if (rowNo) {
          const addshopItemDB = new addShopItem();
          addshopItemDB.ShoppingItem = event.value;
          addshopItemDB.PNR = rowNo.PNR;

          this.service.addShoppingItem(addshopItemDB).subscribe((response) => {
            this.getPassengersDetails(this.flightSeleted);
          });
        }
  }
  addServices(event, rowNo) {
    if (rowNo) {
      const addserviceDB = new addService();
      addserviceDB.ServiceName = event.value;
      addserviceDB.PNR = rowNo.PNR;
      this.service.addServies(addserviceDB).subscribe((response) => {
            this.getPassengersDetails(this.flightSeleted);
          });
        }
  }
}
