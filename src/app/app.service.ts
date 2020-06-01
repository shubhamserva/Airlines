import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { url } from '../config/url'
import {addPassengerDB} from '../models/addPassengerDB'
import { addShopItem } from 'src/models/addShopItemDB';
import { checkIn } from 'src/models/checkInDB';
import { updateMealDB } from 'src/models/updateMealDB';
import { addService } from 'src/models/addServiceModelDB';
import { updatePassengerDB } from 'src/models/updatePessangerDB';

@Injectable({ providedIn: 'root' })
export class services {
    constructor(private http: HttpClient) { }

    getFlights() {
        return this.http.get(url.getFlights);

    }
    getPassengers(flightId) {
        return this.http.get(url.getPassengers+'?flightId='+flightId );
    }
    deleteFlights(flightId){    
        //console.log("Deleting Flights");
        return this.http.get(url.deleteFlights+'?flightId='+flightId );
    }
    addPassengers(passengerData: addPassengerDB){
        return this.http.post(url.addPassengers,passengerData);
    }
    updatePassengers(passengerData: updatePassengerDB){
        return this.http.post(url.updatePassengers,passengerData);
    }
    addShoppingItem(data:addShopItem){
        return this.http.post(url.addShopItem,data);
    }
    addServies(Servicedata:addService){
        return this.http.post(url.addService,Servicedata);
    }
    checkIn(data:checkIn){
        return this.http.post(url.checkIn,data);
    }
    updateMeal(data:updateMealDB){
        return this.http.post(url.updateMeal,data);
    }
    getServices(flightInfo){
        
        return this.http.get(url.getServices+'?flightId='+flightInfo );
    }
    addAncillaryItems(data){
        //console.log("flight id 2",data)
        return this.http.post(url.addAncillaryServices,data);
    }
    removeAncillaryItems(data){
        return this.http.post(url.removeAncillaryItems,data);
    }
    getFlightDetails(flightId){
        return this.http.get(url.getFlightDetails+'?flightId='+flightId );
    }
}
