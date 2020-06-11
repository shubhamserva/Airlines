import {Action} from '@ngrx/store';

export const ADMIN = 'ADMIN';
export const STAFF = 'STAFF';


export class Admin implements Action {
    readonly type = ADMIN;
        constructor() {
     }
}

export class Staff implements Action {
    readonly type = STAFF;
   // constructor(public payload: any) { }
}


export type LoginAs = Admin | Staff;
