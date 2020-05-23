import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { url } from '../config/url'
import {addPassengerDB} from '../models/addPassengerDB'
import { addShopItem } from 'src/models/addShopItemDB';
import { checkIn } from 'src/models/checkInDB';
@Injectable({ providedIn: 'root' })
// options: { headers?: HttpHeaders | { [header: string]: string | string[]; };
//  observe?: "body"; params?: HttpParams | { [param: string]: string | string[]; };
//   reportProgress?: boolean; responseType: "arraybuffer"; withCredentials?: boolean; })
export class services {
    constructor(private http: HttpClient) { }

    getFlights() {
        return this.http.get(url.getFlights);

    }
    getPassengers(flightId) {
        console.log("Getting Details");
        return this.http.get(url.getPassengers+'?flightId='+flightId );
    }
    deleteFlights(flightId){    
        console.log("Deleting Flights");
        return this.http.get(url.deleteFlights+'?flightId='+flightId );
    }
    addPassengers(passengerData: addPassengerDB){
        return this.http.post(url.addPassengers,passengerData);
    }
    updatePassengers(passengerData: addPassengerDB){
        console.log("updating Passengers");
        return this.http.post(url.updatePassengers,passengerData);
    }
    addShoppingItem(data:addShopItem){
        return this.http.post(url.addShopItem,data);
    }
    addServies(Servicedata:addShopItem){
        return this.http.post(url.addService,Servicedata);
    }
    checkIn(data:checkIn){
        return this.http.post(url.checkIn,data);
    }
    changeSeat(data:checkIn){
        return this.http.post(url.changeSeat,data);
    }
}
