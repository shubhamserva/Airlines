import * as AuthActions from '../Actions/auth.actions'

export class State {
    isAuthenticated: boolean;
    userData: any;
    errorModel: any;
}

// export const initialState: State = {
//     isAuthenticated: undefined,
//     userData: undefined,
//     errorModel: undefined
// };

export function authReducer(State, action: AuthActions.AuthActions){
        switch (action.type){
            case AuthActions.LOGIN:{
                return {
                    ...State,
                    isAuthenticated:true,
                    userData:action.payload,
                    errorModel:null

                }
            }
            case AuthActions.LOGOUT:{
               return{
                    ...State,
                    isAuthenticated:false,
                    userData:null,
                    errorModel:null 
               }
            }
            case AuthActions.LOGINFAIL: {
                return{
                    ...State,
                    isAuthenticated:false,
                    userData:null,
                    errorModel:action.payload
                }
            }
            default:{
                return State;
            }
        }
}