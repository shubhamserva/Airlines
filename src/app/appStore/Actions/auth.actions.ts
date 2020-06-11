import {Action} from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGINFAIL = 'LOGINFAIL';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: any) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export class LoginFail implements Action {
    readonly type = LOGINFAIL;
    constructor(public payload: any) { }
}

export type AuthActions = Login | Logout | LoginFail;
