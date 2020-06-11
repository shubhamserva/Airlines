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
  seats: any = seat;
  constructor(private service: services, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.flightSeleted = localStorage.getItem('Selected_Flight');
    this.getPassengersDetails(this.flightSeleted);
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
  addShopItem(event: any) {
    this.dialog
      .open(AddShopItem, { width: '300px', data: {} })
      .afterClosed()
      .subscribe((shopItem) => {
        if (shopItem) {
          const addshopItemDB = new addShopItem();
          addshopItemDB.ShoppingItem = shopItem.Name;
          addshopItemDB.PNR = event.PNR;

          this.service.addShoppingItem(addshopItemDB).subscribe((response) => {
            this.getPassengersDetails(this.flightSeleted);
          });
          setTimeout(() => {
            this.getPassengersDetails(this.flightSeleted);
          }, 4000);
        }
      });
  }
  addServices(event) {
    this.dialog
      .open(UpdateService, {
        width: '300px',
        data: {
          services: event.services,
        },
      })
      .afterClosed()
      .subscribe((serviceDialog) => {
        if (serviceDialog) {
          const addserviceDB = new addService();
          addserviceDB.ServiceName = serviceDialog.Services;
          addserviceDB.PNR = event.PNR;
          this.service.addServies(addserviceDB).subscribe((response) => {
            this.getPassengersDetails(this.flightSeleted);
          });
        }
      });
  }
  changeMeal(event: any) {
    this.dialog
      .open(UpdateMeal, {
        width: '300px',
        data: {
          services: event.Services,
        },
      })
      .afterClosed()
      .subscribe((mealData) => {
        if (mealData) {
          // tslint:disable-next-line:no-shadowed-variable
          const updateMeal = new updateMealDB();
          updateMeal.Meal = mealData;
          updateMeal.PNR = event.PNR;
          this.service.updateMeal(updateMeal).subscribe((response) => {
            this.getPassengersDetails(this.flightSeleted);
          });
        }
      });
  }
}
