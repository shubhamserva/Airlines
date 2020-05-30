import * as LoginAs from '../Actions/userType.action'

export class User {
    type: String;
}

export const initialState: User = {
    type: 'Select Your Role'
};

export function userTypeReducer(
    state = initialState,
    action: any) {
    switch (action.type) {
        case LoginAs.ADMIN: {
            //console.log("state updated");
            return {
                ...state,
                type: 'admin',
            }
        }
        case LoginAs.STAFF: {
            return {
                ...state,
                type: 'staff'
            }
        }
        default:{
            return state;
        }

    }
}