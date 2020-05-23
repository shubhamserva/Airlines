import {Action} from '@ngrx/store'
import { addPassengerDB } from 'src/models/addPassengerDB';

export const FILTER_PASSENGER = 'FILTER_PASSENGER';
export const LoginStatus = 'false';
export class FilterPassenger implements Action {
    readonly type = FILTER_PASSENGER;

    constructor(public payload: addPassengerDB){
        
    }
}

export type adminActions = FilterPassenger