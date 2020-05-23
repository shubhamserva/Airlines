import { addPassengerDB } from 'src/models/addPassengerDB';
import * as adminActions from '../Actions/app.action'
import { Action } from '@ngrx/store'

const defaultData = {
    PassengerData:[
       // new addPassengerDB()
    ]
}

export function PassengerDataReducer(
    state = defaultData,
    action:adminActions.FilterPassenger){

    switch (action.type){
        case adminActions.FILTER_PASSENGER:
            return {... state,
            PassengerData:[...state.PassengerData,action.payload]
            };
        default:
            return state;
    }
}